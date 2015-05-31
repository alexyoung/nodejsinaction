# DOCKER-VERSION 1.4.1
# To build:
# 1. Install docker (http://docker.io)
# 2. Build container: docker build -t <your username>/nodeia-ch06 .
# 3. Run the examples: docker run -p 8000:3000 -d <your username>/nodeia-ch06
# 4. Show the logs if required: docker logs -d <container id>
# 5. To test you may need to figure out the IP address of the virtual
#    network interface made by Docker.  Mac example:
#      open http://$(boot2docker ip 2>/dev/null):8000/

FROM    nodesource/node:wheezy

RUN     apt-get install -y nodejs curl build-essential
COPY    . /src

RUN     cd /src/listing6_11; npm install

EXPOSE  3000
CMD     ["node", "/src/listing6_11/index.js"]

# References:
#   https://docs.docker.com/examples/nodejs_web_app/
#   https://registry.hub.docker.com/u/nodesource/node/
