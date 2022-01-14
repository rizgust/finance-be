FROM node:14.16.0 

WORKDIR /home/node/app

COPY . .
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]