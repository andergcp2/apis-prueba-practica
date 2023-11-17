Instrucciones
Cree un nuevo proyecto de Nest.js
Abra el proyecto en el editor de su preferencia
Suba el proyecto a un repositorio de GitHub en su cuenta personal
Haga commit y push en su repositorio bifurcado periódicamente
Punto 1. Persistencia (6%)
Esta aplicación tiene el propósito de crear un sistema de consulta de la oferta de supermercados en las ciudades.
Cree la entidad Ciudad en el módulo correspondiente. Una ciudad tiene un nombre, un país y un número de habitantes.
Cree la entidad Supermercado en el módulo correspondiente. Un supermercado tiene un nombre, una longitud, una latitud y una página web.
Incluya la asociación entre Ciudad y Supermercado; tenga en cuenta que una ciudad tiene varios supermercados y un supermercado tiene sedes en varias ciudades.
Punto 2. Lógica (43%)
Defina la lógica de Ciudad, esta debe incluir los métodos findAll, findOne, create, update y delete. Dentro de los métodos create y update, valide que el país al que pertenece la ciudad esté en la siguiente lista:
Argentina, Ecuador, Paraguay.
Defina la lógica de Supermercado, esta debe incluir los métodos findAll, findOne, create, update y delete. Dentro de los métodos create y update, valide que el nombre del supermercado tenga más de 10 caracteres.
Defina la lógica de la asociación, esta debe incluir 5 métodos con las siguientes acciones:
addSupermarketToCity: Asociar un supermercado a una ciudad.
findSupermarketsFromCity: Obtener los supermercados que tiene una ciudad.
findSupermarketFromCity: Obtener un supermercado de una ciudad.
updateSupermarketsFromCity: Actualizar los supermercados que tiene una ciudad.
deleteSupermarketFromCity: Eliminar el supermercado que tiene una ciudad.
Implemente las pruebas para la lógica de Ciudad, para la lógica de Supermercado y para la lógica de la asociación.
Punto 3. API (24%)
Cree la clase del controlador para Ciudad, agregue la ruta /cities y defina los endpoints findAll, findOne, create, update y delete con sus respectivas anotaciones.
Cree la clase del controlador para Supermercado, agregue la ruta /supermarkets y defina los endpoints findAll, findOne, create, update y delete con sus respectivas anotaciones.
Cree la clase del controlador para la asociación Ciudad-Supermercado, agregue la ruta de modo que se acceda a los endpoints a través de la ciudad (ej. /cities/1/supermarkets/4 para findSupermarketFromCity) e implemente los endpoints:
addSupermarketToCity
findSupermarketsFromCity
findSupermarketFromCity
updateSupermarketsFromCity
deleteSupermarketFromCity

Punto 4. Pruebas de Postman (27%)
Defina 3 colecciones donde implemente las siguientes pruebas de postman para las entidades y para la asociación.
Método
Ciudad
Supermercado
Asociación
POST
Crear una ciudad válida.
Crear un supermercado válido.
Asociar un nuevo supermercado a una ciudad.
POST
Crear una ciudad inválida.
Crear un supermercado inválido.
Asociar un supermercado que no existe a una ciudad.
GET
Obtener todas las ciudades.
Obtener todos los supermercados.
Obtener todos los supermercados que pertenecen a una ciudad.
GET
Obtener una ciudad por ID.
Obtener un supermercado por ID
Obtener un supermercado asociado a una ciudad.
GET
Obtener una ciudad por un ID que no existe.
Obtener un supermercado por un ID que no existe.
Obtener un supermercado que no está asociado a una ciudad.
PUT
Actualizar una ciudad.
Actualizar un supermercado.
Actualizar los supermercados que están asociados a una ciudad.
PUT
Actualizar una ciudad con un ID que no existe.
Actualizar un supermercado con un ID que no existe.
Actualizar los supermercados asociados a una ciudad, con un supermercado inexistente.
DELETE
Eliminar una ciudad por su ID.
Eliminar un supermercado por su ID.
Eliminar un supermercado asociado a una ciudad.
DELETE
Eliminar una ciudad con un ID que no existe.
Eliminar un supermercado con un ID que no existe.
Eliminar un supermercado que no estaba previamente asociado a una ciudad.

Entregable
Dentro del proyecto de Nest.js cree una carpeta denominada collections y exporte ahí las colecciones.
Suba todos los cambios a su repositorio.
Haga un release con el tag v1.0.0 y el nombre parcial-practico.
Suba el archivo .zip del release como respuesta a la actividad de Coursera.
Después de finalizado el plazo de entrega no realice ninguna modificación al repositorio bifurcado. Cualquier cambio, por pequeño que sea, anula automáticamente el parcial.
