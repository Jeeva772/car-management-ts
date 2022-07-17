Steps for docker setup:

1. Bild and creating the docker image
    > docker build . -t node-typscript
2. start the app
    > docker-compose up
3. To check the running containers
    > docker ps 
4. To check the docker logs
    > docker logs <containerId>
5. To kill the running container
    > docker kill <containerId>
6. To remove docker image 
    > docker image rm -f <imageId>
7. To go into the container
    > docker exec -u 0 -it <containerid> /bin/bash