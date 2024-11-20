const urlBase64ToUint8Array = (base64String) => {
  
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = atob(base64);

 
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

const saveSubscription = async (subscription) => {
  const response = await fetch('http://localhost:5000/save-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  });
  return response.json();
}

 
self.addEventListener('install', function(event) {
  event.waitUntil(
    self.skipWaiting().then(() => {
      console.log('Service worker installed!');
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    self.clients.claim().then(() => {
      console.log('Service worker activated!');
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/path-to-your-icon.png'
  });
});

self.addEventListener('activate', async (e) => {
  try {
    const subscription = await self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BCoZetIZDVC9nbAkQmdXdLwXwXyEIYeuq1xpJ4Cnqc-TJdf3w9bkbD0JGu4v1kx7uuqBMHnKQPlkIaWPu5Er2uI')
    });
console.log("subscription in sw.js",subscription)
    const response = await saveSubscription(subscription);
    console.log("Subscription saved in sw.js:", response);
  } catch (error) {
    console.error('Error in subscribing or saving subscription:', error);
  }
});
