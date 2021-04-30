# 3308 Individual Project
Full-stack project for CU Boulder CSCI 3308 Spring 2021

### Deployments
Heroku: https://omdbapi-3308-project.herokuapp.com/

Self-hosted: https://omdb.fclaude.net/

### Setup

Build the docker images
```bash
docker-compose build
```

Run docker-compose script
```bash
docker-compose up
```

Run docker-compose script (detatched mode)
```bash
docker-compose up -d
```

Kill service
```bash
docker-compose down
```

To run tests
```bash
docker-compose run web npm test
```
