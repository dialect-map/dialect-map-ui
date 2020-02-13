# Data Science: Dialect map UI

This repository contains the current front-end interface of the Dialect map project.
It has been built using [React][react-webpage] using the [PaperSpace public front-end][paperscape-ui] as inspiration.

## Functionality

#### Paper selection
![Paper selection demo](resources/selection_demo.gif)

#### Jargon comparison
![Jargon comparison demo](resources/jargon_demo.gif)


## Environment setup
All dependencies can be installed by running:
```shell script
npm install
npm install --global serve
```

## Project development
```shell script
npm start
```

## Project build
```shell script
make build
```

## Project deploy
```shell script
make deploy
```

## Docker build
```shell script
make docker-build
```

## Docker run
```shell script
make docker-deploy
```


[paperscape-ui]: https://github.com/paperscape/paperscape-mapclient
[react-webpage]: https://reactjs.org/
