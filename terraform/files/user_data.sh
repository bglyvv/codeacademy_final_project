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

cd codeacademy_final_project/Backend

docker build -t node_app .
docker run -p 80:80 -e ConnectionStrings__Default="Host=${db_endpoint};Port=3306;Username=admin;Password=kb6853917;Database=phonebook" node_app
