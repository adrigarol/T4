/*
Ejercicio de desarrollo de servicios con Express. Sobre la base de datos de "libros" de  
sesiones anteriores, se desarrollarán los servicios básicos paras operaciones habituales de
GET, POST, PUT y DELETE. 

En esta versión del ejercicio, se estructura el código en carpetas separadas para modelos
y enrutadores
*/

// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Enrutadores
const libros = require(__dirname + '/routes/libros');
const autores = require(__dirname + '/routes/autores'); // Para la parte opcional

// Conectar con BD en Mongo 
mongoose.connect('mongodb://127.0.0.1:27017/libros', {useNewUrlParser: true});

// Inicializar Express
let app = express();

// Cargar middleware body-parser para peticiones POST y PUT
// y enrutadores

// Ejercicio 1: middleware para mostrar mensaje "En mantenimiento"
/*
app.use((req, res, next) => {
    res.send({ error: "En mantenimiento" });
})
*/

app.use(bodyParser.json());
app.use('/libros', libros);
app.use('/autores', autores) // Para la parte opcional

// Puesta en marcha del servidor
app.listen(8080);
