# Data Science: Dialect map UI

This repository contains the front-end interface of the Dialect map project.


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


## Functionality

#### Paper selection
![Paper selection demo](resources/selection_demo.gif)

#### Jargon comparison

**Note:** _The jargon comparison feature is not provided by this repository,
although it can be easily added, as shown in the following demonstration GIF._

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


[leaflet-webpage]: https://leafletjs.com/
[paperscape-blog]: https://blog.paperscape.org/
[paperscape-ui]: https://github.com/paperscape/paperscape-mapclient
[react-webpage]: https://reactjs.org/
[semantic-webpage]: https://react.semantic-ui.com/
