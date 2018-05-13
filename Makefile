FIG=docker-compose
SERVER_CONTAINER=express
SERVER_RUN=$(FIG) run --rm $(SERVER_CONTAINER)
SERVER_EXEC=$(FIG) exec $(SERVER_CONTAINER)

.DEFAULT_GOAL := help
.PHONY: help up stop status logs back back-test

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'




##
## Project setup
##---------------------------------------------------------------------------

up:             ## Start project containers
up:
	$(FIG) up -d

stop:           ## Remove project containers
stop:
	$(FIG) kill
	$(FIG) rm -v --force

status:         ## Container status
status:
	$(FIG) ps

logs:           ## Display container logs
logs:
	$(FIG) logs -f


##
## Server
##---------------------------------------------------------------------------

back:           ## Execute bash in server container
back:
	$(SERVER_EXEC) bash

back-test:      ## Run all server tests
back-test:
	$(SERVER_EXEC) yarn run test





