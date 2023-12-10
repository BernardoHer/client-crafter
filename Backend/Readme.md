# Correr el proyecto en local
1. descargar el repositorio
2. npm install 
3. npm run start
## Con los anteriores pasos se levanta un rest api con dos endpoint.
## http://localhost:3001/api/users crear, obener, obtener por id, eliminar usuario por id 
## adicional tiene un array de purchases que relaciona las facturas del cliente 
## http://localhost:3001/api/purchases crea, obtiene elimina por id cada purchase se relaciona a un usuario puede tener muchas "purchases", la persistencia se realiza en mongodb.