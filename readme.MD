How to start the application

In DEV mode:

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

In Prod mode:

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

How to check redis ->

docker ps
docker exec -it CONTAINER_ID redis-cli

GET key_city_name
