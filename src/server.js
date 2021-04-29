var express = require("express"); //Ensure our express framework has been added
var app = express();
var bodyParser = require("body-parser"); //Ensure our body-parser tool has been added
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require("pg-promise")();

const dev_dbConfig = {
  host: "db",
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

/** If we're running in production mode (on heroku), the we use DATABASE_URL
 * to connect to Heroku Postgres.
 */
const isProduction = process.env.NODE_ENV === "production";
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = { rejectUnauthorized: false };
}

const db = pgp(dbConfig);

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/")); //This line is necessary for us to use relative paths and access our resources directory

// homepage
app.get("/", function (req, res) {
  res.render("pages/main", {
    local_css: "main.css",
    my_title: "Movie Search",
  });
});

// add reviews
app.post("/addReview", async function (req, res) {
  const timeDate = new Date();
  const movieTitle = req.body.movie_name;
  const movieReview = req.body.movie_review;

  // insert
  var insertQuery = `INSERT INTO reviews (movie_name, movie_review, review_date)
					   VALUES ('${movieTitle}', '${movieReview}', '${timeDate}');`;

  // select
  var selectQuery = `SELECT movie_name, movie_review, review_date FROM reviews;`;

  await db
    .task("/addReview", (task) => {
      return task.batch([task.any(insertQuery), task.any(selectQuery)]);
    })

    .then((data) => {
      res.redirect("/reviews");
    })

    .catch((err) => {
      console.log("error", err);
    });
});

// get reviews
app.get("/reviews", function (req, res) {
  let selectQuery = `SELECT movie_name, movie_review, review_date FROM reviews;`;

  db.any(selectQuery)

    .then((rows) => {

      if (req.query.movie_title) {
        var queryLength = req.query.movie_title.length;

        var filterRows = rows.filter(function (row) {
          return (
            row.movie_name.toLowerCase().slice(0, queryLength) ===
            req.query.movie_title.toLowerCase()
          );
        });
        res.render("pages/reviews", {
          my_title: "Movie Reviews",
          data: filterRows.length ? filterRows : rows,
        });
      } else {
        res.render("pages/reviews", {
          my_title: "Movie Reviews",
          data: rows,
        });
      }
    })

    .catch((err) => {
      console.log(err);
      res.render("pages/reviews", {
        my_title: "Movie Reviews",
        data: "",
      });
    });
});

//app.listen(3000);
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

module.exports.server = server;
