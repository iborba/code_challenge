<div align="center">

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/iborba/code_challenge/CI/master)
[![Coverage Status](https://coveralls.io/repos/github/iborba/code_challenge/badge.svg)](https://coveralls.io/github/iborba/code_challenge)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/iborba/code_challenge?label=release)
![CI](https://github.com/iborba/code_challenge/workflows/CI/badge.svg)
![docker hub](https://github.com/iborba/code_challenge/workflows/DOCKER%20HUB/badge.svg?branch=master)

</div>

# INTRODUCTION
This project consists in a NodeJs application that gets business and reviews from Yelp Fusion APIs. It was developed in Typescript and has the following endpoints:
***
  * GET /api/business
  * GET /api/business/reviews
***

<div align="center">

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Code-Challenge&uri=https%3A%2F%2Fgist.github.com%2Fiborba%2F2e26e20f2b5e100faa709eeaa3394fba) 

</div>

# STRUCTURE

At this version, the project contains the follow structure
```
.
├── api_request.json
├── docker
│   └── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── k8s
│   ├── deployment.yaml
│   └── service.yaml
├── nodemon.json
├── package.json
├── package-lock.json
├── prettier.config.js
├── README.md
├── src
│   ├── app.ts
│   ├── config
│   │   └── messages.ts
│   ├── controllers
│   │   ├── business.controller.ts
│   │   └── business-reviews.controller.ts
│   ├── interface
│   │   ├── controllers
│   │   │   ├── business.interface.ts
│   │   │   ├── business-review.interface.ts
│   │   │   └── review.interface.ts
│   │   └── services
│   │       ├── yelp-business.interface.ts
│   │       ├── yelp-location.interface.ts
│   │       ├── yelp-review.interface.ts
│   │       └── yelp-user.interface.ts
│   ├── middlewares
│   │   ├── loggerMiddleware.ts
│   │   └── validators
│   │       └── headers.ts
│   ├── routes.ts
│   ├── server.ts
│   └── services
│       ├── api.ts
│       ├── business-reviews-service.ts
│       ├── business-service.ts
│       ├── yelp-business-service.ts
│       └── yelp-review-service.ts
├── __tests__
│   ├── middlewares
│   │   ├── loggerMiddleware.test.ts
│   │   └── validators
│   │       └── headers.test.ts
│   └── services
│       ├── business-reviews-service.test.ts
│       ├── business-service.test.ts
│       ├── yelp-business-service.test.ts
│       └── yelp-review-service.test.ts
├── tsconfig.json
└── tslint.json
```
# RUNNING
 * Notice that you must have your own Yelp API Key to access the apis successfully

And there's two ways to execute this project using containers.

  - Via docker-compose 
    - ```sh
      #!/bin/bash 
      $ docker-compose -f docker/docker-compose.yml up -d
      ```
  - Via Kubernetes Cluster 
    - ```sh
      #!/bin/bash 
      $ kubectl apply -f k8s/deployment.yaml
      $ kubectl apply -f k8s/service.yaml
      ```
  - Or, to run this project in local mode, plase try as follows:
    - ```sh
      #!/bin/bash 
      $ npm i
      $ npm run dev
      ```

# TESTING
  To run tests, do the follows
  - ```sh
    #!/bin/bash 
    # if you didn't installed the libs, please run 
    $ npm i
    # then
    $ npm run test
  ```

