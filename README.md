# INTRODUCTION
This project consists in a NodeJs application that gets business and reviews from Yelp Fusion APIs. It was developed in Typescript and has the following endpoints:
***
  * GET /api/business
  * GET /api/business/reviews
***

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Code-Challenge&uri=https%3A%2F%2Fgist.github.com%2Fiborba%2F2e26e20f2b5e100faa709eeaa3394fba)

[![Coverage Status](https://coveralls.io/repos/github/iborba/code_challenge/badge.svg)](https://coveralls.io/github/iborba/code_challenge)

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
├── __mocks__
│   ├── code-challenge business.ts
│   ├── code-challenge reviews.ts
│   ├── yelp business.ts
│   └── yelp reviews.ts
├── nodemon.json
├── package.json
├── package-lock.json
├── prettier.config.js
├── README.md
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── business.ts
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
│       └── yelp-business-service.ts
├── __tests__
│   ├── controllers
│   │   └── business-controller.test.ts
│   └── services
│       └── yelp-business-service.test.ts
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

