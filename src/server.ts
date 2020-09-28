import express, { Request, Response } from 'express'

interface User {
  name: string
  email: string
}

const app = express()

const array: User[] = []

app.use(express.json())

app.get(
  '/users',
  (request: Request, response: Response): Response => {
    return response.json(array)
  },
)
app.post(
  '/users',
  (request: Request, response: Response): Response => {
    const { name, email } = request.body

    array.push({ name, email })

    return response.json({ name, email })
  },
)

app.listen(3333, () => console.log('Sever On'))
