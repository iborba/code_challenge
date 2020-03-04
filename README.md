This project consists in a NodeJs application that gets business and reviews from Yelp Fusion APIs. It was developed in Typescript and has the following features:
  GET /api/business
  GET /api/business/reviews

There's two ways to execute this project using containers.
  - Via docker-compose 
    - ```
      #!/bin/bash 
      docker-compose -f docker/docker-compose.yml up -d
      ```
  - Via Kubernetes Cluster 
    - ```
      #!/bin/bash 
      kubectl apply -f k8s/deployment.yaml
      kubectl apply -f k8s/service.yaml
      ```
  * You can import the file ./api_request.json to Postman or insomnia and customize your data to test this apis