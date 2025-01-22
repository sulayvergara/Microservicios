# Usa una imagen base de Node.js
FROM node:18-alpine

# Instalar dependencias necesarias para compilar bcrypt
RUN apk update && apk add --no-cache \
    python3 \
    build-base \
    && rm -rf /var/cache/apk/*

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install
COPY . .

# Exponer el puerto del contenedor
EXPOSE 3002

# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]
