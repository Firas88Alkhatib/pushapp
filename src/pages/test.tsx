import { useEffect, useState } from 'react'

// const registerWorker = async () => {
//   const registeration = await navigator.serviceWorker.register('./worker.ts')
//   console.log('worker scope: ', registeration)
//   return registeration
// }

const base64ToUint8Array = (base64: string) => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const isSupported = async () => {
  if (!navigator?.serviceWorker) {
    console.log('Service Workers are not supported')
    return false
  }
  if (!window?.PushManager) {
    console.log('PushManager is not supported')
    return false
  }
  return true
}

const PUBLIC_KEY = 'BH_2jIJP4OrEYhhkUNqawRjKB6JbvDr2SnQR1fr1KmHYO5ZdiZGyb0YsYFKxByg5HmgECFo_MafpA_3BGQv-xxw'

const Test = () => {
  const [permission, setPermission] = useState<PermissionState | NotificationPermission>()
  const [subscription, setSubscription] = useState<PushSubscription>()
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>()
  const [error, setError] = useState('')
  // const [registration, setRegistration] = useState<ServiceWorkerRegistration>()

  useEffect(() => {
    const init = async () => {
      try {
        if (!isSupported()) return
        // const registeration = await registerWorker()
        const reg = await navigator.serviceWorker.ready
        const sub = await reg.pushManager.getSubscription()
        console.log(sub)
        setRegistration(reg)
        if (sub) setSubscription(sub)
      } catch (error: any) {
        console.log(error)
        setError(JSON.stringify(error))
      }
    }
    init()
  }, [])
  useEffect(() => {
    setPermission(Notification.permission)
    // navigator.permissions.query({ name: 'notifications' }).then((permStatus) => {
    //   permStatus.onchange = () => {
    //     console.log('permstate', permStatus.state)
    //     setPermission(permStatus.state)
    //   }
    // })
  }, [])

  const subscribeButtonOnClick = async () => {
    const sub = await registration?.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(PUBLIC_KEY),
    })
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sub),
    })
    setSubscription(sub)
    console.log('web push subscribed!')
    console.log(sub)
  }

  const unsubscribeButtonOnClick = async () => {
    await fetch('/api/subscribe', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    })
    await subscription?.unsubscribe()
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(undefined)
    console.log('web push unsubscribed!')
  }
  return (
    <div>
      {permission !== 'granted' ? (
        <>
          <button onClick={async () => await Notification.requestPermission()}>ask permission</button>
          <p>{error}</p>
        </>
      ) : (
        <>
          <button onClick={subscribeButtonOnClick} disabled={!!subscription}>
            Subscribe
          </button>
          <button onClick={unsubscribeButtonOnClick} disabled={!subscription}>
            Unsubscribe
          </button>
        </>
      )}
    </div>
  )
}

export default Test
