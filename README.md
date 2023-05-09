# LiftLogger

**Track your progress, reach your goals**

LiftLogger is created to help fitness enthusiasts track their training progress, monitor their body metrics, and visualize their growth and improvement over time. With this app, you can easily create personalized training templates, add and remove weightlifting movements, and log your daily weightscale information, making it easy to stay on top of your fitness goals.

## Project installation and configuration

1. Install docker. More at https://docs.docker.com/get-docker/.

2. Clone this repository:

```bash
git clone https://github.com/RobertoCDiaz/liftlogger.git
```

3. Navigate to the repo directory:

```bash
cd liftlogger
```

4. Create a `.env` file using `.env-template` as a reference. Then configure the commented variables.

```bash
cp .env-template .env
```

> NOTE: You must create an Auth0 application and put your credentials in the `.env` file under the `# AUTH0 CONFIG` section.

```bash
# auth0 app domain
AUTH0_DOMAIN=
# auth0 app client id
AUTH0_CLIENT_ID=
# auth0 unique identifier for the api
AUTH0_AUDIENCE=
```

## Run the project

1. Go to the root directory and start up the Docker containers using `docker compose`:

```bash
docker compose up
```

> This will create the Docker images and automatically start the containers. You can add the `-d` flag at the end of the composing command to detach from the console process.

## Run tests

Each project has its own test suites. To execute the test for a project, go to either `liftlogger-client` or `liftlogger-server`, and in their root directory, run the following command:

```
npm run test
```
