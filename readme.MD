
# Welcome to Weather Buddy ☂️


> An app that consumes Open Weather Api maps the response and cache the result. Builded with nodejs 

## :information_source: How to use the api

```sh
git clone https://github.com/lucaskbr/api-weather-buddy.git
cd api-weather-buddy
cp .env .env.example
# Edit the .env and add value to WEATHER_MAP_API_KEY
npm i
# Check tests
npm run test
# Run the app
npm run up:prod
# Docker compose will handle the app
```

## 🔥  How to use the front-end interface
```sh
git clone https://github.com/lucaskbr/front-weather-buddy.git
yarn
yarn start
# Can use any port to run the app
```


## 🔍  Inspect redis data

```sh
docker ps
docker exec -it CONTAINER_ID redis-cli
KEYS *
GET key
```


## ✈️ Routes

| METHOD | URI | DESCRIPTION |
| ------ | ------ | ------ |
| GET | **/weather/:cityName** | find weather by city name |
| GET | **/weather?max=number** | find latestes searched cities |



## 🏢 Architecture

<p align="center">
  <img src="https://user-images.githubusercontent.com/39783638/91785851-a44c0780-ebdc-11ea-885c-4590d13a4e6d.png" height="300">
</p>

The hexagonal architecture, or ports and adapters architecture, is an architectural pattern used in software design. 

It aims at creating loosely coupled application components that can be easily connected to their software environment by means of ports and adapters. 

This makes components exchangeable at any level and facilitates test automation.

## 📕 References


* Reflectoring: (https://reflectoring.io/spring-hexagonal/)
* GeeksForGeeks: (https://www.geeksforgeeks.org/hexagonal-architecture-in-java/)
* RefactoringGuru: (https://refactoring.guru/pt-br)
* SourceMaking: (https://sourcemaking.com/design_patterns)
* Rodrigo Branas: (https://www.youtube.com/c/RodrigoBranas/videos)
* Rodrigo Manguinho (https://www.youtube.com/c/MangoDeveloper/videos)



## :eyeglasses: Author

* Github: [@lucaskbr](https://github.com/lucaskbr)
* Linkedin: [@lucaskbr](https://www.linkedin.com/in/lucas-klasa-13891414b/)
