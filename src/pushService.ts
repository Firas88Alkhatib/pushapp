import webPush from 'web-push'

const PUBLIC_KEY = 'BH_2jIJP4OrEYhhkUNqawRjKB6JbvDr2SnQR1fr1KmHYO5ZdiZGyb0YsYFKxByg5HmgECFo_MafpA_3BGQv-xxw'
const PRIVATE_KEY = 'MUhNkIJBdimoIAOjptd4f_bEJUwZ3EbErElirrIUeEM'

const vapidKeys = {
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
}

webPush.setVapidDetails('mailto:firas88alkhatib@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)

export { webPush }
