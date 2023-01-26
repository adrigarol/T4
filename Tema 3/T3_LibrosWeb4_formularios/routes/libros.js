const express = require('express');

let Libro = require(__dirname + '/../models/libro.js');
let router = express.Router();

// Listado general
router.get('/', (req, res) => {
    Libro.find().then(resultado => {
        res.render('libros_listado', { libros: resultado});
    }).catch (error => {
    }); 
});

// Formulario de nuevo libro
router.get('/nuevo', (req, res) => {
    res.render('libros_nuevo');
});

// Formulario de edición de libro
router.get('/editar/:id', (req, res) => {
    Libro.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('libros_editar', {libro: resultado});
        } else {
            res.render('error', {error: "Libro no encontrado"});
        }
    }).catch(error => {
        res.render('error', {error: "Libro no encontrado"});
    });
});

// Ficha de libro
router.get('/:id', (req, res) => {
    Libro.findById(req.params.id).then(resultado => {
        if (resultado)
            res.render('libros_ficha', { libro: resultado});
        else    
            res.render('error', {error: "Libro no encontrado"});
    }).catch (error => {
    }); 
});

// Insertar libros
router.post('/', (req, res) => {
    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio
    });
    nuevoLibro.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', {error: "Error insertando libro"});
    });
});

// Borrar libros
router.delete('/:id', (req, res) => {
    Libro.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', {error: "Error borrando libro"});
    });
});

// Modificar libros
router.put('/:id', (req, res) => {
    Libro.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio
        }
    }, {new: true}).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', {error: "Error modificando libro"});
    });
});

module.exports = router;