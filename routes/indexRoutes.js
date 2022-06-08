import url from 'url'
import express from 'express'
import axios from 'axios'
import apicache from 'apicache'

const router = express.Router()

// Env vars
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    })

    // console.log(`${API_BASE_URL}?${params}`)

    const response = await axios.get('https://api.chucknorris.io/jokes/random')
    // console.log(response)
    const data = await response.data

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default router
