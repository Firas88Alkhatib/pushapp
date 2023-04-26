import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../storeService'
import { webPush } from '../../pushService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('sending push')
    await client.connect()
    const keys = await client.keys('*')
    console.log('allkeeeeys', keys)
    for (const key of keys) {
      const subscription = await client.get(key)
      console.log('key and value', key, subscription)
      if (subscription) {
        webPush.sendNotification(
          JSON.parse(subscription)!,
          JSON.stringify({ title: 'Hello Web Push', message: 'Your web push notification is here!' })
        )
      }
    }
    await client.disconnect()
  } catch (e) {
    console.log('errorrrrrrrrr', e)
  }
  res.status(200).json({ result: 'done' })
}
