import { NextApiRequest, NextApiResponse } from 'next'
import { sendNotification } from './subscribe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('sending push')
  await sendNotification()
  res.status(200).json({ result: 'done' })
}
