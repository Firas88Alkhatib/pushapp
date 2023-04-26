// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import webPush from 'web-push'

type Data = {
  name: string
}

const PUBLIC_KEY = 'BH_2jIJP4OrEYhhkUNqawRjKB6JbvDr2SnQR1fr1KmHYO5ZdiZGyb0YsYFKxByg5HmgECFo_MafpA_3BGQv-xxw'
const PRIVATE_KEY = 'MUhNkIJBdimoIAOjptd4f_bEJUwZ3EbErElirrIUeEM'

const vapidKeys = {
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
}

webPush.setVapidDetails('mailto:firas88alkhatib@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)

const respo = { title: 'Hello Web Push', message: 'Your web push notification is here!' }

export const sendNotification = async () => {
  console.log('received push')
  console.log('subs:', (global as any).subscribtions)
  ;(global as any).subscribtions.forEach(async (sub: any) => {
    const result = await webPush.sendNotification(sub, JSON.stringify(respo))
    console.log('webPush Result: ', result)
  })
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    ;(global as any).subscribtions.push(req.body)
  }
  if (req.method === 'PUT') {
    console.log('delete body', req.body.endpoint)
    ;(global as any).subscribtions = (global as any).subscribtions.filter((sub: any) => {
      sub.endpoint === req.body.endpoint
    })
  }
  console.log('request: ', req.body)
  res.status(200).json({ name: 'John Doe' })
}
