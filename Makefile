MAKEFLAGS += --always-make

default: format

format:
	biome format --write .

build:
	web-ext build
