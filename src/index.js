const path = require('path');
const app = require('./app');
const logger = require('morgan');
const mongoose = require('mongoose');
const express = require('express');

//Sirve para tratar la data que pasas al sistema por el form
const bodyParser = require('body-parser');

const indexRoute = require('./routes/index');
/* ***********************
 ******Connect to DB*******
 *************************  */
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));
/* ***********************
 ******Setings*******
 *************************  */

//Configurar la app para que tome los puertos del entorno de producción, de lo contrario que tome el puerto 4000
//15min
app.set('port', process.env.PORT || 4000);

//18min
app.set('views', path.join(__dirname, 'views'));
//no se requiere porque trabaja integrado a Express
app.set('view engine', 'ejs');

//Static (archivos estáticos -> carpeta public)
app.use(express.static(path.join(__dirname,'public')));


/* ***********************
 ******Middlewares*******
 *************************  */
app.use(logger('combined'))
//es true porque solo vamos a recibir texto de los formularios 

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


/* ***********************
 ******Routes*******
 *************************  */
app.use(require('./routes/index'))

/* ***********************
 ******Start server*******
 *************************  */
//es necesrio usar `` para que se vea el contenido de ${}
app.listen(app.get('port'),
    () => console.log(`Server running at port ${app.get('port')}`)
);