import { Request, Response } from 'express'
import Knex from 'knex'

export class ItemsController {
  constructor(private connection: Knex) {}

  async index(_request: Request, response: Response) {
    const items = await this.connection('items').select('*')

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        image_url: `http://localhost:8888/uploads/${item.image}`,
        title: item.title,
      }
    })

    return response.json(serializedItems)
  }
}
