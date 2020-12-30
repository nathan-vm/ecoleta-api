import express from 'express'

import { connection } from './database/connection'

import { PointsController } from './controllers/PointsController'
import { ItemsController } from './controllers/ItemsController'

const routes = express.Router()

const pointsController = new PointsController(connection)
const itemsController = new ItemsController(connection)

routes.get('/items', itemsController.index.bind(itemsController))

routes.get('/points', pointsController.index.bind(pointsController))
routes.post('/points', pointsController.create.bind(pointsController))
routes.get('/points/:id', pointsController.show.bind(pointsController))

export { routes }
