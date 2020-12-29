import express, { Request, Response } from 'express'

const app = express()

app.use(express.json())

app.get(
  '/',
  (_request: Request, response: Response): Response => {
    return response.json({ message: 'Hello World' })
  },
)
app.listen(3333, () => console.log('Sever On'))
