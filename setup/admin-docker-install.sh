#!/bin/sh

echo ">>> INSTALLING DEPENDENCIES"
apt-get update
apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

echo ">>> ADDING DOCKER REPO INFO"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

apt-key fingerprint 0EBFCD88

add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

echo ">>> INSTALLING DOCKER"
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io

echo ">>> TESTING DOCKER"
docker run hello-world