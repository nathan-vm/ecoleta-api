import express, { Request, Response } from 'express'

const app = express()

app.get('/users', (request:Request, response:Response):void => {
  response.send('hi')
})

app.listen(3333, () => console.log('Sever On'))
