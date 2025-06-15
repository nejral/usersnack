APP_NAME=usersnack-backend
CONTAINER_NAME=usersnack-container
PORT=8000

.PHONY: build start clean logs

build:
	docker build -t $(APP_NAME) .

start:
	docker run --rm -it \
		--name $(CONTAINER_NAME) \
		-v $(shell pwd)/app:/app/app \
		-p $(PORT):8000 \
		$(APP_NAME)

logs:
	docker logs -f $(CONTAINER_NAME)

clean:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true
	docker rmi $(APP_NAME) || true
