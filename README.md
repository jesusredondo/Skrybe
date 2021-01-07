# Inicializando el repositorio de Skrybe

# TODO:


0. Node
    1. Express
    2. Nodemon
    3. Cors
    4. Formidable
    5. Dotenv
    6. Bcryptjs
    7. JSON Web Token

1. Gestionar usuarios en el servidor
    1. Rutas para control de usuarios.
    2. Oauth2 (Pendiente)
    3. JWT
    4. Guardar credencial en cliente


2. Persistencia de datos
    1. MongoDB
    2. Express + Moongose

3. API REST
    1. Especificación de la API
    2. Subir rutas
        1. Subir ficheros
    3. Editar rutas
    4. Descargar actividades
        1. Paginación de la descarga
    5. Eliminar rutas.
    6. Listar usuarios
        6.1 Hacer/Eliminar seguidores

4. Cliente REACT
    1. Pantallas y navegación de la interfaz.
    2. Gestión de credenciales y login.
    4. Subida de actividades
    5. Gestíon de seguidores
    6. Timeline

# 0. Node
Node.js es el software elegido para desarrollar la parte servidor. Los módulos disponibles desde [NPM](https://www.npmjs.com/) permiten añadir funcionalidad sobre la base de Node, conviertiéndolo en una herramienta perfecta para desarrollos seguros y rápidos.

## 0.1. Express
Para instalar Express:
```npm i express```

Express nos permite:
* **Emplear middlewares**: Se ejecutan entre que se recibe la petición y se da una respuesta. Nos permite ir añadiendo capas intermedias en este procesamiento como middlewares. Se usan para:
    * Convertir el cuerpo de la petición a un objeto JSON: ```app.use(express.json());```.
    * Emplear [Router de Express](https://expressjs.com/en/guide/routing.html) para procesar peticiones y organizar nuestras rutas de manera modular.

El servidor escucha por defecto en el puerto 3000.

# 0.2. Nodemon
[Nodemon](https://www.npmjs.com/package/nodemon) es una herramienta que permite reiniciar una aplicación de node cada vez que se detecta un cambio en cualquier fichero del directorio donde se ejecuta.

Para ejecutar el servidor se ha creado el script **start** en **package.json** para lanzar el index.js cada vez que haya cambios:

```bash 
    nodemon index.js
```

# 0.3 Cors
[El paquete cors de NPM](https://www.npmjs.com/package/cors) permite gestionar el cors de manera casi transparente como un middleware de Express.

# 0.4 Formidable
[Formidable NPM](https://www.npmjs.com/package/formidable) es un middleware de Node que convierte las peticiones de un formulario que se forma con un [Formdata](https://developer.mozilla.org/en-US/docs/Web/API/FormData) para que se encuentren disponibles en la petición dentro de: ```req.fields``` y ```req.files```. Es fundamental para manejar muchas de las peticiones que vienen desde el cliente mediante un formulario.

# 0.5 Dotenv
[Dotenv](https://www.npmjs.com/package/dotenv) permine incluir variables de estado para guardar información de manera segura sin que se encuentre en el código JS.

# 0.6 Bryptjs
[Bcryptjs](https://www.npmjs.com/package/bcryptjs) es un paquete de NPM que se emplea para encriptar las contraseñas en las bases de datos.

# 0.7 JSON Web Token
[JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) es una implementación de la tecnología de Web Tokens. Permite generar tokens a partir de un secreto que guarda el servidor. Sólo el servidor puede generar los tokens.

# 0.8 toGeoJson
[toGeoJeson]() es una librería que permite convertir ficheros KML y GPS a GeoJSON. Al realizar la conversión devuelve un objeto con la representación en GeoJSON .

# 1. Gestionar usuarios en el servidor

## 1.1 Rutas para el control de usuarios.

Se diferencian dos servicios principales. La API para gestionar el login y la API para gestionar las peticiones de los usuarios en la ejecución de la web.

Para las rutas de gestión de usuarios se empleará el siguiente prefijo: **/api/auth/**. Con las siguientes subrutas:

* **/signin**: Crea una cuenta nueva de usuario. Un usuario es un objeto con las siguientes características:
```javascript
    let usuario = { 
        _id: 1, //Auto generado - Obligatorio - Automático
        nombre: "Jesús", //Mínimo 3 caracteres. - Obligatorio
        apellidos: "Redondo García", //Mínimo 3 caracteres - Obligatorio
        email: "redondogarciajesus@gmail.com", //Bien formado - Obligatorio
        password: "2134skjd2345kbsdf", //Encriptada - Obligatorio
        imagen: "https://....", //Url de la imagen
        createdAt: 2020-10-13T17:54:42.911+00:00, //Fecha creación - Automático
        updatedAt: 2020-10-13T17:54:42.911+00:00, //Fecha modificación - Automático
        __v: 0 //Versión - Automático
        }
```

* **/login**: Permite autentificar a un usuario. Un usuario se autentifica enviando un objeto como el siguiente:
```javascript
    let objLogin = { 
        email: "redondogarciajesus@gmail.com", //Bien formado - Obligatorio
        password: "2134skjd2345kbsdf", //Encriptada - Obligatorio
        }
```
La respuesta ante un login tiene la siguiente forma:
```javascript
    let objLoginDevuelto = { 
        _id: 1, 
        nombre: "Jesús", 
        apellidos: "Redondo García",
        email: "redondogarciajesus@gmail.com",
        imagen: "https://....", 
        }
```
Además en la respuesta se incluirá la siguiente cabecera HTTP, siguiendo la expecificación propuesta por la documentación de [JWT](https://jwt.io/introduction/) y [Bearer Token](https://tools.ietf.org/html/rfc6750).
```http
    HTTP/1.1 200 OK
    Content-Type: application/json;charset=UTF-8
    Cache-Control: no-store
    Pragma: no-cache

    {
    "access_token":"mF_9.B5f-4.1JqM", 
    "token_type":"Bearer"
    }
```
De esta manera el usuario termina el proceso de autenticación, obteniendo el Token JWT. Cada futura petición que necesite autorización irá acompañada de la siguiente cabecera, tal y como especifica la documentación anteriormente mencionada:
```http
    GET /resource HTTP/1.1
    Host: server.example.com
    Authorization: Bearer mF_9.B5f-4.1JqM
```
Este modelo de autorización permite que cliente y servidor no tengan que guardar estado sobre la sesión. Perfecto para emplear en conjunción con las API REST.


# 3 API REST
La comunicación entre el servidor y el cliente se realiza a través de una API REST. De este modo nos aseguramos desacoplar totalmente las dos partes que conforman la aplicación, permitiendo:
* Cambiar o substituir el servidor sin tener que modificar el cliente y viceversa.
* Asegurarnos de que todas las peticiones no necesitan guardar sesión o estado, lo que hace mucho más simple la comunicación.
* Utilizar estándars web de comunicación. Empleo de HTTP + JSON + peticiones asíncronas por los clientes.


## 3.1. Especificacin de la API
Toda la gestión de la api colgará de la ruta ```/api```

Dependiendo de la tarea en concreto, se gestionará en un [Router](https://expressjs.com/en/guide/routing.html) diferente. 

Todas las rutas de la API están protegidas con autentificación de usuario.

Veremos esas subrutas en cada uno de los siguientes puntos.

## 3.2. Subir rutas
Las rutas para subir datos parten de ```/api/upload/```, son las siguientes:

* Subida de fotos para el usuario:

* Subida de ficheros de rutas:
    -  ```/api/upload/routeGPX```: Sube un fichero GPX directamente. Convertirá el fichero a GeoJSON.. la conversión tiene la siguiente  estructura:
```javascript
{ type: 'FeatureCollection',
  features:
   [ { type: 'Feature', //Aquí empieza un objeto feature, que es lo que almaceno.
       properties:
        { name: 'Tempo ride 🔥',
          type: '1',
          time: '2020-11-21T08:42:15Z',
          _gpxType: 'trk',
          coordTimes:
           ['2020-11-21T08:42:15Z',
             '2020-11-21T08:42:16Z', ...
           ],
           heartRates:
           [ 68,
             68,...
           ],
           geometry:
        { type: 'LineString',
          coordinates:
           [ [ -6.375398, 39.468687, 548 ],
             [ -6.375277, 39.468732, 548.4 ],...
           ]
           } 
        }
     } 
    ] 
}
```
* La subida comprueba que no exista otra actividad con esa misma fecha. Si no existe, entonces la sube.



## 3.3. Consultar los usuarios
Las rutas para consultar los usuarios parten de ```/api/usuarios/```, son las siguientes:


* Obtener todos los usuarios:
    
    -  ```/api/usuarios/```: Devuelve todos los usuarios del sistema.

    -  ```/api/usuarios/yo```: Devuelve mi usuario de vuelta.



## 3.3. Consultar las actividades
Las rutas de las actividades parten de ```/api/actividades/```. Son las siguientes:

* Obtener todas las actividades:
    -  ```/api/actividades/```: Devuelve todas las actividades del usuario que realiza la petición. TODO: Debería poder filtrarse por campos las actividades.

    -  ```/api/actividades/[_id]```: Devuelve la actividad con _id = '_id'.

    -  ```/api/actividades/usuario/[_id]```: Devuelve las actividades del usuario con id = '_id'



## 3.2.1. Subir ficheros
## 3. Editar rutas
    4. Descargar actividades
        1. Paginación de la descarga
    5. Eliminar rutas.
    6. Listar usuarios
        6.1 Hacer/Eliminar seguidores
