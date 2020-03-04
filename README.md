This project consists in a NodeJs application that gets business and reviews from Yelp Fusion APIs. It was developed in Typescript and has the following endpoints:
***
  GET /api/business
  GET /api/business/reviews
***

At this version, the project contains the follow structure
```
├── api_request.json
├── docker
│   └── docker-compose.yml
├── Dockerfile
├── k8s
│   ├── deployment.yaml
│   └── service.yaml
├── nodemon.json
├── package.json
├── package-lock.json
├── prettier.config.js
├── README.md
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── business.ts
│   ├── interface
│   │   └── controllers
│   │       ├── business.interface.ts
│   │       ├── business-review.interface.ts
│   │       ├── location.interace.ts
│   │       ├── review.interface.ts
│   │       └── user.interface.ts
│   ├── middlewares
│   │   ├── loggerMiddleware.ts
│   │   └── validators
│   │       └── headers.ts
│   ├── routes.ts
│   └── services
│       └── api.ts
├── tsconfig.json
└── tslint.json
```
And there's two ways to execute this project using containers.
  - Via docker-compose 
    - ```
      #!/bin/bash 
      $ docker-compose -f docker/docker-compose.yml up -d
      ```
  - Via Kubernetes Cluster 
    - ```
      #!/bin/bash 
      $ kubectl apply -f k8s/deployment.yaml
      $ kubectl apply -f k8s/service.yaml
      ```
***
  * You can import the file ./api_request.json to Postman or insomnia and customize your data to test this APIs
***
