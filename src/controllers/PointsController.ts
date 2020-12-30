import { Request, Response } from 'express'
import Knex from 'knex'

export class PointsController {
  constructor(private connection: Knex) {}

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body

    const point = {
      image:
        'https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }
    const trx = await this.connection.transaction()

    const [{ id: insertedId }] = await trx('points').insert(point, ['id'])

    const pointItems = items.map((itemId: number) => {
      return { item_id: itemId, point_id: insertedId }
    })

    await trx('point_items').insert(pointItems, ['id'])

    await trx.commit()

    return response.json({ id: insertedId, ...point })
  }

  async show(request: Request, response: Response) {
    const { id } = request.params

    const point = await this.connection('points').where('id', id).first()

    if (!point) {
      return response.status(400).json({ message: 'Point not found' })
    }

    const items = await this.connection('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title', 'items.id')

    return response.json({ point, items })
  }

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    const points = await this.connection('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    return response.json(points)
  }
}
