import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'
import 'colors'
import indexRoutes from './routes/indexRoutes.js'

const PORT = process.env.PORT || 5000

const app = express()

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
})

app.use(limiter)
app.set('trust proxy', 1)

app.get('/api', (req, res) => {
  res.json('Hello World')
})

// Routes
// app.use('/api', indexRoutes)

// Enable cors
app.use(cors())
// app.use(cors(), (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
//   // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.blue)
})
