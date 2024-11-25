import React  ,{useEffect ,useRef ,useState}from 'react'
import Controls from '../commons/Controls' 
import {useDispatch, useSelector} from 'react-redux'
import { saveSubscriptionInitiate } from '../redux/action/saveSubscriptionAction';
import { sendNotificationInitiate } from '../redux/action/sendNotificationAction';

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

const PushNotificationComponent = () => {

    const [name ,setName] = useState(null)
    const [token ,setToken] =useState(null)
    const hasExecuted = useRef(false); 

    const dispatch = useDispatch()

    const result1 = useSelector((state)=>state.savesubscription.data || {})
    const result2 = useSelector((state)=>state.sendnotification.data || {})
    console.log("results1",result1, "result2",result2)

   useEffect(()=>{
    const token = localStorage.getItem('googleToken') || localStorage.getItem('Token');
    console.log("token",token )
    setToken(token)
   },[token]) 
 

  useEffect(() => {
    if (token) {
      const requestPermission = async () => {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            checkSubscription(token);
          } else {
            console.log('Notification permission denied.');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      };

      if ('serviceWorker' in navigator && !hasExecuted.current) {
        navigator.serviceWorker
          .register('/firebaseConfig-sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
            requestPermission();
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
        hasExecuted.current = true;
      }
    }
  }, [token]);

  useEffect(() => {
    const username = localStorage.getItem('signinUserName') || localStorage.getItem('signupUserName') || localStorage.getItem('username');
    setName(username);
    console.log('username in notification', username);
  }, [token]);

  const checkSubscription = async (token) => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      console.log('existingSubscription', existingSubscription);

      if (!existingSubscription) {
        console.log('No subscription found. Subscribing user...');
        subscribeUser(token);
      } else {
        await saveSubscription(existingSubscription, token);
       
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const subscribeUser = async (token) => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const applicationServerKey = urlBase64ToUint8Array('BCoZetIZDVC9nbAkQmdXdLwXwXyEIYeuq1xpJ4Cnqc-TJdf3w9bkbD0JGu4v1kx7uuqBMHnKQPlkIaWPu5Er2uI');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      console.log('User subscribed:', subscription);
      await saveSubscription(subscription, token);
    } catch (error) {
      console.error('Error subscribing user:', error);
    }
  };

  const saveSubscription = async (subscription, token) => {
    try {
      dispatch(saveSubscriptionInitiate(subscription, token));

      const endpoint = subscription.endpoint
      localStorage.setItem("endpoint",endpoint)
      console.log("endpoint",endpoint)
      
      console.log("token in saveSubscription",token)
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };

  // const updateSubscription = async (existingSubscription, token) => {
  //   try {
  //     // dispatch(saveSubscriptionInitiate(subscription, token));
  //     const res = axios.put('http://localhost:5050/update/subscription',{existingSubscription, token})
  //     console.log("token in saveSubscription",token)
  //   } catch (error) {
  //     console.error('Error saving subscription:', error);
  //   }

  // }
      
   
  return (
    <>
    <Controls.Grid container justifyContent="center">
        {/* <Controls.Grid item sx={{}} mt={5}>
    <Controls.Button variant ="secondary" 
    // onClick = {sendPushNotification}
    >Notify</Controls.Button>
    </Controls.Grid> */}
    </Controls.Grid>
    </>
  )
}

export default PushNotificationComponent