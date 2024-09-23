FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_PROFILE=$VITE_PROFILE
ARG VITE_API_URL=$VITE_API_URL

RUN echo "VITE_PROFILE=${VITE_PROFILE}" >> .env && \
    echo "VITE_API_URL=${VITE_API_URL}" >> .env

RUN npm run build

FROM nginx:alpine 

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]