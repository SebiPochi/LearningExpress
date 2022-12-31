const express = require('express')
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

const app = express()
const port = 3000

app.use(express.json())

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
