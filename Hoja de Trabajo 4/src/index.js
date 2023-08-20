import express from 'express'
import ejs from 'ejs'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))


app.listen(3000)
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))
console.log('Server is listening on port 3000')
console.log(join(__dirname, 'views'))
app.get('/',(req, res) => res.render('index'))
app.get('/test',(req, res) => res.render('test'))