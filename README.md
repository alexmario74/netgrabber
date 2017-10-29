# Netgrabber

## Overview

It is a _toy_ project to apply some technique like *Dependency Injection*, *Functional Programming* (in Javascript), and full text coverage over documentation.

This is a rewrite of another _toy_ project you can find here [microservices/backend-service](https://github.com/alexmario74/microservices/tree/master/backend-service). So please have a look there to understand the purpose of the project.

The main challenge here is to strongly divide each _task_. 

Here an overview of all tasks:

 1. The module should load devices from a remote source (in the original project was a Redis server). 
 1. Then it should save those devices in a local cache (based on lokijs db).
 1. The module should generate random values for each measures of local devices.
 1. All generated measures should saved in local db.
 1. All generated measures should also be saved in remote destination (a Redis server).

 To do all such things in a way that each task is indipendent and the code remain highly testable, there are several 
 solutions.

 I choose to work with a functional approach with introduction of *High Order Functions* to inject dependencies.

## Run the module

To run the node application just follow:

    $ git clone https://github.com/alexmario74/netgrabber.git
    $ cd netgrabber
    $ npm install
    $ npm start

It will generate a _.json_ file in the folder *netgrabber.json*, you can remove it each time.

To launch the tests:

    $ npm test

For the coverage:

    $ npm run coverage

An _.html_ report will be generated in the folders _coverage/lcov-report/index.html_.

