FROM node:23-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 8082

CMD ["http-server", "dist", "-p", "8082", "-o"]

# ========================
# ETAPA DE CONSTRUCCIÓN
# ========================

# Usa una imagen de Node.js (versión 23, basada en Alpine Linux) como base para construir la aplicación
# FROM node:23-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
# WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json) al contenedor
# COPY package*.json ./

# Instala las dependencias definidas en package.json
# RUN npm install

# Copia todo el código fuente del proyecto al contenedor
# COPY . .

# Ejecuta el comando de build para generar los archivos optimizados en la carpeta dist/
# RUN npm run build


# ========================
# ETAPA DE PRODUCCIÓN
# ========================

# Usa una imagen ligera de Nginx para servir los archivos construidos
# FROM nginx:stable-alpine

# Copia los archivos generados en la etapa de construcción a la carpeta pública de Nginx
# COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 8081 del contenedor (aunque Nginx usa el 80 por defecto, esto es opcional)
#  EXPOSE 8081

# Comando por defecto que mantiene Nginx corriendo en primer plano
#  CMD ["nginx", "-g", "daemon off;"]
