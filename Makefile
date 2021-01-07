APP_VERSION    = $(shell cat VERSION)
IMAGE_NAME     = "dialect-map-ui"

GCP_PROJECT   ?= "ds3-dialect-map"
GCP_REGISTRY  ?= "us.gcr.io"
GCP_IMAGE_NAME = $(GCP_REGISTRY)/$(GCP_PROJECT)/$(IMAGE_NAME)


.PHONY: check
check:
	@echo "Checking code format"
	@npx prettier --check "src/**/*.js"


.PHONY: clean
clean:
	@echo "Cleaning built folder"
	@rm -rf build


.PHONY: build
build: clean
	@echo "Building project"
	@npm run build --silent


.PHONY: deploy
deploy:
	@echo "Deploying project"
	@npm start


.PHONY: docker-build
docker-build:
	@echo "Building Docker image"
	@docker build . --tag $(IMAGE_NAME):$(APP_VERSION)


.PHONY: docker-push
docker-push: docker-build
	@echo "Pushing Docker image to GCP"
	@docker tag $(IMAGE_NAME):$(APP_VERSION) $(GCP_IMAGE_NAME):$(APP_VERSION)
	@docker push $(GCP_IMAGE_NAME):$(APP_VERSION)
	@docker rmi $(GCP_IMAGE_NAME):$(APP_VERSION)
