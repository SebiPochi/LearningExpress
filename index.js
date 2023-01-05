const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

const app = express()
const port = 3000

app.use(express.json())

const whiteList = [
    'http://localhost:8000',
    'http://localhost:80',
    'http://localhost:3000',
    'https://learning-express.onrender.com'
]
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error('Not Allowed'))
        }
    }
}
app.use(cors(options))

app.get('/', (req, res) => {

    res.send('AAAA')

})

app.get('/profile', (req, res) => {
    res.json(
        {
            name: 'Pochi',
            tuki: 120
        }
    )
})

routerApi(app)

//se ejecutaran en orden
app.use(boomErrorHandler)
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
})
