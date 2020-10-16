# Inicializando el repositorio de Skrybe

# TODO:


0. Node
    1. Express

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

# 0 Node
Node.js es el software elegido para desarrollar la parte servidor. Los módulos disponibles desde [NPM](https://www.npmjs.com/) permiten añadir funcionalidad sobre la base de Node, conviertiéndolo en una herramienta perfecta para desarrollos seguros y rápidos.

# 0.1 Express
Para instalar Express:
```npm i express```

Express nos permite:
* **Emplear middlewares**: Se ejecutan entre que se recibe la petición y se da una respuesta. Nos permite ir añadiendo capas intermedias en este procesamiento como middlewares. Se usan para:
    * Convertir el cuerpo de la petición a un objeto JSON: ```app.use(express.json());```.
    * Emplear [Router de Express](https://expressjs.com/en/guide/routing.html) para procesar peticiones y organizar nuestras rutas de manera modular.

El servidor escucha por defecto en el puerto 3000.

# 0.2 Nodemon
[Nodemon](https://www.npmjs.com/package/nodemon) es una herramienta que permite reiniciar una aplicación de node cada vez que se detecta un cambio en cualquier fichero del directorio donde se ejecuta.

Para ejecutar el servidor se ha creado el script **start** en **package.json** para lanzar el index.js cada vez que haya cambios:

```bash 
    nodemon index.js
```


# 1. Gestionar usuarios en el servidor

# 1.1 Rutas para el control de usuarios.

Se diferencian dos servicios principales. La API para gestionar el login y la API para gestionar las peticiones de los usuarios en la ejecución de la web.

Para las rutas de gestión de usuarios se empleará el siguiente prefijo: **/api/auth/**. Con las siguientes subrutas:

* **/signin**: Crea una cuenta nueva de usuario. Un usuario es un objeto con las siguientes características:
```javascript
    let usuario = { 
        _id: 1, //Auto generado - Obligatorio - Automático
        nombre: "Jesús", //Mínimo 3 letras, sin números. - Obligatorio
        apellidos: "Redondo García", //Mínimo 3 letras, sin números - Obligatorio
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