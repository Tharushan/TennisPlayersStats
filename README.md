# TennisPlayersStats

## Installation

```
git clone git@github.com:Tharushan/TennisPlayersStats.git
cd TennisPlayersStats && npm i
```

## How to start

```
npm start
```

or if you want to run it on dev mode

```
npm run dev
```

Then you can access it on http://localhost:8000/

There are four routes: 
- GET [/api/fromMock/players/](https://tennisplayersstats.herokuapp.com/api/fromMock/players/) : List all players from Json file
- GET [/api/fromMock/players/:id`](https://tennisplayersstats.herokuapp.com/api/fromMock/players/17) : Get player by Id from Json file
- GET [/players/](https://tennisplayersstats.herokuapp.com/players) : List all players from API
- GET [/players/:id`](https://tennisplayersstats.herokuapp.com/players/17) : Get player by Id from API


## Tests and coverage:
```
npm test
```

You can see the coverage with `npm run coverage` command or on linux you have the following command that will open the coverage in a .html file

```
npm run show-coverage
```

## Postman Collection 

There is a postman collection if you want to try this routes https://www.getpostman.com/collections/009ad0fef8e207f1704e

You will have to define `host` env variable to http://localhost:8000

The application is deployed on https://tennisplayersstats.herokuapp.com/ so you can test directly on this endpoint
