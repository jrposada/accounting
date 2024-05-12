# Accounting

## Requirements

-   [Docker](https://www.docker.com/).

## Local development

1. Launch local backend: `npm --workspace=backend run dev`
2. Initialize database: `npm --workspace=backend run db:migrate:up`
3. Launch local frontend: `npm --workspace=frontend run dev`

### Connect to database

1. Go to [pgAdmin portal](http://localhost:3050/)
2. Login:
    1. Username: `jrposada.dev@gmail.com`
    2. Password: `changeme`
3. Select Add New Server and fill data form as follow:
    1. General:
        1. Name: Accounting (doesn't really matters)
    2. Connection (values match `compose.yml` definition):
        1. Host name/address: `accounting_db` (docker service name)
        2. Port: `5432`
        3. Username: `jrposada.dev`
        4. Password: `changeme`

## How to deploy

### Prerequisite

-   Create new builder for multi platform building:

    ```
    docker buildx create --name raspberry-builder --bootstrap --use
    ```

    After running above command `docker buildx ls` should look something like this:

    ```
    $ docker buildx ls
    NAME/NODE            DRIVER/ENDPOINT             STATUS  BUILDKIT             PLATFORMS
    raspberry-builder *  docker-container
        raspberry-builder0 unix:///var/run/docker.sock running v0.12.4              linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6
    default              docker
        default            default                     running v0.12.4+3b6880d2a00f linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6
    ```

-   Install `jq`

    ```bash
    sudo apt install jq
    ```

### Instructions

1. Push new docker image

    ```bash
    npm run publish:docker
    ```

2. SSH into Raspberry:

    ```bash
    # Stop current and remove current containers
    docker compose down

    # Pull latest changes
    git pull
    docker compose pull

    # Start container
    npm start
    ```
