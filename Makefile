build:
	gulp build

run:
	gulp

docker/build:
	make build
	docker build --rm -f Dockerfile --platform linux/amd64 -t pj-escape:latest .

docker/push:
	docker tag pj-escape:latest asia.gcr.io/days-cw/pj-escape:latest
	docker push asia.gcr.io/days-cw/pj-escape:latest
