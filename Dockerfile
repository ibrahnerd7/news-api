FROM node:24.4.1

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install pm2 -g
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start-server"]