# Traigo ngnix para servir la app
FROM nginx:1.13-alpine

# Variables de entorno para la configuración de la app
ENV APP_PATH /app
# Agrego @angular/cli al path de la imagen
ENV PATH $APP_PATH/node_modules/@angular/cli/bin/:$PATH
# Actualizo node, creo el directorio de la app y remuevo la configuracion inicial de nginx
RUN apk add --update --no-cache nodejs && mkdir $APP_PATH && rm -rf /etc/nginx/config.d/*
# Set del directorio de trabajo
WORKDIR $APP_PATH
# Copio el package.json
ADD package.json .

RUN npm install -g npm-check-updates && ncu -u && ncu -a
# Instalo las dependencias
RUN npm install
# Añado la aplicación
ADD . .
# Copio la aplicación a la imagen
# COPY  . .
# Agrego la configuración de nginx
COPY nginx/default.conf /etc/nginx/conf.d/
    # build de la aplicación para producción
RUN ng build --aot --prod \
    # Remuevo lo que trae por defecto nginx
    && rm -rf /usr/share/nginx/html/* \
    # Muevo la aplicación al directorio de nginx
    && mv ./dist/* /usr/share/nginx/html/ \
    # Limpio cache
    && npm cache clean \
    && apk del nodejs libstdc++ libgcc libuv http-parser ca-certificates \
    # Remuevo el codigo inicial de la app
    && rm -rf ./*
#inicio nginx
CMD ["nginx", "-g", "daemon off;"]
