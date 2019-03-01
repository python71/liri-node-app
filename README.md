## Overview

A command-line Language Interpretation and Recognition Interface node application. This application provides data about a given movie, concert, or song. 

## Technologies Used: 

* Node.js
* Axios
* dotENV  
* Moment
* fs
* Node-Spotify-API
* Bands In Town API
* OMDB API

## Prerequisites

* API keys for Spotify (ID and Secret), Bands In Town, and OMDB
* A .env file containing your API keys. Please refer to ```keys.js``` 
* Install NPM packages with ```npm install``` in the command line

## Commands

* movie-this movie
* concert-this band
* spotify-this-song song
* do-what-it-says

## How It Works

1. To load the app: ```node liri.js```
    ![Liri Demo](https://github.com/python71/liri-node-app/assets/liri-bot.mp4)