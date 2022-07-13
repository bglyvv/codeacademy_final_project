#!/usr/bin/env bash

sudo -i

sudo yum update -y
sudo yum install docker -y
sudo usermod -aG docker ec2-user
sudo systemctl enable docker
sudo systemctl start docker

sudo yum install git -y

mkdir -p /src/my-app

cd /src/my-app


git clone https://github.com/bglyvv/codeacademy_final_project

cd codeacademy_final_project/Frontend

docker build --build-arg DOMAIN=jgjhgjh -t react_app .
docker run -p 80:80 react_app
