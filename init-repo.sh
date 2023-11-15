#!/bin/sh
set -e

# Change to the git-data directory
cd /git-data

# Initialize a new Git repository
git init --bare Lab_Quiz.git

# Add an initial README file
echo "# Lab_Quiz" > Lab_Quiz.git/README.md

# Commit and push the initial changes
git --git-dir=Lab_Quiz.git --work-tree=. add .
git --git-dir=Lab_Quiz.git --work-tree=. commit -m "Initial commit"
git --git-dir=Lab_Quiz.git --work-tree=. push origin master
