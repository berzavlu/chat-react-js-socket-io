# Chat React Js Socket.io mongoDB

### Instalación en W10

Ejecutar el directorio de mongo: mongod --dbpath "C:\Program Files\MongoDB\data\db"
Ejecutar mongo y crear una bd
Crear un usuario
`db.createUser({ user: "mongoadmin" , pwd: "mongoadmin", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]})`

Instalar dependencias e iniciar servidor

```sh
$ cd node
$ npm install
$ npm run start
```

Instalar dependencias e iniciar chat

```sh
$ cd react
$ npm install
$ npm run dev
```
