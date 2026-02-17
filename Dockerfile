# Estágio 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Estágio 2: Servir com Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# Esta linha busca dinamicamente a pasta que contém o index.html e copia o conteúdo
COPY --from=build /app/dist/ /temp_dist/
RUN cp -r /temp_dist/$(ls /temp_dist | head -n 1)/browser/* /usr/share/nginx/html/ || \
  cp -r /temp_dist/$(ls /temp_dist | head -n 1)/* /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
