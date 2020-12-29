import express from 'express'

import { connection } from './database/connection'

const routes = express.Router()

routes.get('/items', async (_request, response) => {
  try {
    const itens = await connection('items').select('*')
    return response.json({ data: itens })
  } catch (err) {
    console.error(err)
    return response.json({ error: 500, message: err })
  }
})

export { routes }
