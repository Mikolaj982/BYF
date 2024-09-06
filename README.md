# 🥊 BYF 🥊

## Links
Design - Miro: https://miro.com/app/board/uXjVKjOX_7o=/ 

## Building new docker image with application backend
In order do build new docker image, follow these steps:
1. Create new package, using `mvn clean install`
2. Go to the directory where the package has been build and build new docker image with `docker build -t <username>/byf-backend:<version> .`. Username used so far is `adrgor`. If you build image with another username you'll have to modify `docker-compose.yml`. You don't need to specify the version yet, then it will be set to `latest` and overwrite the last image with this version. This is acceptable for now since we don't have a released version yet.
3. Login to docker with `docker login`
4. Run `docker push <username>/byf-backend:<version>` to push the image
5. You can now run the whole backend using `docker-compose.yml` and running `docker compose up`
