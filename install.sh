#!/bin/bash

# Step 1: Import the public key
sudo apt-get install gnupg
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

# Step 2: Create a list file for MongoDB
UBUNTU_VERSION=$(lsb_release -cs)
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu $UBUNTU_VERSION/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Step 3: Reload local package database
sudo apt-get update

# Step 4: Install MongoDB packages
sudo apt-get install -y mongodb-org

# Step 5: Start MongoDB
sudo systemctl start mongod

# Step 6: Enable MongoDB to start on system boot
sudo systemctl enable mongod
