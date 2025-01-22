# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install
COPY . .

# Exponer el puerto del contenedor
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]
