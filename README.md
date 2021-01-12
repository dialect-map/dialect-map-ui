# Dialect map UI

This repository contains the front-end interface of the Dialect map project.
An idea proposed by professor Kyle Cranmer, and developed as one of
the Data Science and Software Services (DS3) funded projects.


## About

This project provides a web client for the [PaperScape project][paperscape-blog],
taking the [PaperSpace public front-end][paperscape-ui] as inspiration, and using a modern
and standardized front-end stack:

- [React][react-webpage] ⚛️
- [Leaflet][leaflet-webpage] 🗺️
- [Semantic][semantic-webpage] 🎨

The PaperScape project describes itself as:

> An interactive map that visualises the arXiv, an open, online repository for scientific research papers.
>
> Each paper in the map is represented by a circle, with the area of the circle proportional
> to the number of citations that paper has. In laying out the map, an N-body algorithm is run
> to determine positions based on references between the papers.


## Environment setup
All dependencies can be installed by running:
```shell script
npm install
npm install --global serve
```


### Project development
To start a development server:
```shell script
make deploy
```


### Formatting
All JavaScript files are formatted using [Prettier][prettier-web], and the custom properties defined
in the `.prettierrc.json` file. To check for code style inconsistencies:
```shell script
make check
```


## Docker
There is a `Makefile` to perform both Docker `build` and `push` operations.

The project is currently designed to be deployed in the _DS3-Dialect-Map_ GCP project,
so the initial step involve using [gcloud][gcloud-cli-setup] CLI tool to log in with GCP:

```shell script
gcloud login
gcloud auth configure-docker
```

To build the image:

```shell script
make docker-build
```

To push the image to the GCP registry:

```shell script
export GCP_PROJECT="ds3-dialect-map"
export GCP_REGISTRY="us.gcr.io"
make docker-push
```


## Deployment
This project uses a set of env. variables to configure the connection with the backend API:

Bear in mind that React does not allow passing **run-time** env. variables to a built application
([reference][react-env-docs]). In order to do so, a dedicated shell script named `parse-env.sh` was created.
This script parses the `.env` file substituting the default values by the ones defined in the environment,
before writing them into a _run-time generated_ JavaScript file (loaded from the `index.html`).

| ENV VARIABLE             | DEFAULT            | REQUIRED | DESCRIPTION                                   |
|--------------------------|--------------------|----------|-----------------------------------------------|
| SERVER_API_HOST          | http://0.0.0.0     | No       | Backend API host to connect                   |
| SERVER_API_PORT          | 8080               | No       | Backend API port to connect                   |


## Acknowledges

We would like to thank the PaperScape authors for maintaining an up-to-date tiles server,
and specially Rob J. Knegjens for being in contact with us during the development of this project.


[leaflet-webpage]: https://leafletjs.com/
[gcloud-cli-setup]: https://cloud.google.com/sdk/docs/install
[paperscape-blog]: https://blog.paperscape.org/
[paperscape-ui]: https://github.com/paperscape/paperscape-mapclient
[prettier-web]: https://prettier.io/docs/en/index.html
[react-env-docs]: https://create-react-app.dev/docs/adding-custom-environment-variables/
[react-webpage]: https://reactjs.org/
[semantic-webpage]: https://react.semantic-ui.com/
