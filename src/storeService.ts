import { createClient } from 'redis'

export const client = createClient({
  password: 'mJU7uES0KKszy497KqXO58QDONKfvKLo',
  socket: {
    host: 'redis-17458.c277.us-east-1-3.ec2.cloud.redislabs.com',
    port: 17458,
  },
})

client.on('error', (err) => console.log('Redis Client Error', err))
