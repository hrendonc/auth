const app = require('./app')
const db = require('./db')

// Conectar a la Base de Datos
db()

// Ejecutar Servidor
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})