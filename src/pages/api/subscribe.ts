// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../storeService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sub = req.body
  console.log('reqbodyyyyyyyy', sub)
  await client.connect()

  if (req.method === 'POST') {
    await client.set(sub.endpoint, JSON.stringify(sub))
  }
  if (req.method === 'PUT') {
    console.log('delete body', sub)
    await client.del(sub.endpoint)
  }
  console.log('request: ', req.body)
  await client.disconnect()
  res.status(200).json({ name: 'John Doe' })
}
