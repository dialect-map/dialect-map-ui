# Dialect map UI

[![CI/CD Status][ci-status-badge]][ci-status-link]
[![Coverage Status][cov-status-badge]][cov-status-link]
[![MIT license][mit-license-badge]][mit-license-link]
[![Code style][code-style-badge]][code-style-link]

This repository contains the front-end interface of the Dialect map project.
An idea proposed by professor Kyle Cranmer, and initially developed as one
of the _Data Science and Software Services_ (DS3) funded projects.


## About
This project provides a web interface for the [Dialect Map project][dialect-map-repo],
taking the interface of the [PaperScape project][paperscape-blog] as inspiration,
but modernizing and standardizing the whole stack. This web client uses:

- [React][webpage-react] ⚛️
- [Leaflet][webpage-leaflet] 🗺️
- [Semantic][webpage-semantic] 🎨


## Environment setup
All dependencies can be installed by running:

```shell
npm install
npm install --global serve
```


### Formatting
All JavaScript files are formatted using [Prettier][webpage-prettier], and the custom properties
defined in the `.prettierrc.json` file. To check for code style inconsistencies:

```shell
make check
```

### Testing
Project testing is performed using [Jest][webpage-jest]. In order to run the tests:

```shell
make test
```


### Run project
To start a development server:

```shell
make run
```


## Docker
There is a `Makefile` to perform both Docker `build` and `push` operations.

The project is currently designed to be deployed in the _DS3-Dialect-Map_ GCP project,
so the initial step involve using [gcloud][docs-gcloud-cli] CLI tool to log in with GCP:

```shell
gcloud login
gcloud auth configure-docker
```

To build the image:

```shell
make docker-build
```

To push the image to the GCP registry:

```shell
export GCP_PROJECT="ds3-dialect-map"
export GCP_REGISTRY="us.gcr.io"
make docker-push
```


## Deployment
This project uses a set of env. variables to configure the connection with the backend API:

Bear in mind that React does not allow passing **run-time** env. variables to a built application
([reference][docs-react-env]). In order to do so, a dedicated shell script named `parse-env.sh` was created.
This script parses the `.env` file substituting the default values by the ones defined in the environment,
before writing them into a _run-time generated_ JavaScript file (loaded from the `index.html`).

| ENV VARIABLE             | DEFAULT            | REQUIRED | DESCRIPTION                                   |
|--------------------------|--------------------|----------|-----------------------------------------------|
| SERVER_API_HOST          | http://0.0.0.0     | No       | Backend API host to connect                   |
| SERVER_API_PORT          | 8080               | No       | Backend API port to connect                   |


## Acknowledges

We would like to thank the PaperScape authors for maintaining an up-to-date tiles server,
and specially Rob J. Knegjens for being in contact with us during the development of this project.


[ci-status-badge]: https://github.com/dialect-map/dialect-map-ui/actions/workflows/ci.yml/badge.svg?branch=main
[ci-status-link]: https://github.com/dialect-map/dialect-map-ui/actions/workflows/ci.yml?query=branch%3Amain
[code-style-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[code-style-link]: https://github.com/prettier/prettier
[cov-status-badge]: https://codecov.io/gh/dialect-map/dialect-map-ui/branch/main/graph/badge.svg
[cov-status-link]: https://codecov.io/gh/dialect-map/dialect-map-ui
[mit-license-badge]: https://img.shields.io/badge/License-MIT-blue.svg
[mit-license-link]: https://github.com/dialect-map/dialect-map-ui/blob/main/LICENSE

[dialect-map-repo]: https://github.com/dialect-map/dialect-map
[docs-gcloud-cli]: https://cloud.google.com/sdk/docs/install
[docs-react-env]: https://create-react-app.dev/docs/adding-custom-environment-variables/
[paperscape-blog]: https://paperscape.org/
[webpage-jest]: https://jestjs.io/
[webpage-leaflet]: https://leafletjs.com/
[webpage-prettier]: https://prettier.io/docs/en/index.html
[webpage-react]: https://reactjs.org/
[webpage-semantic]: https://react.semantic-ui.com/
