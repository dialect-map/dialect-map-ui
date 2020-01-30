# Set of rules to simplify project interaction

IMAGE_NAME="dialect-map-react-ui"


.PHONY: clean
clean:
	@echo "Cleaning built folder"
	@rm -rf build

.PHONY: build
build:
	@echo "Building project"
	@npm run build --silent


.PHONY: deploy
deploy:
	@echo "Deploying project"
	@serve -s build


.PHONY: docker-build
docker-build:
	@echo "Building Docker image"
	@docker build . --tag $(IMAGE_NAME):latest


.PHONY: docker-deploy
docker-deploy:
	@echo "Deploying Docker container"
	@docker run -it -p 5000:5000 $(IMAGE_NAME):latest
