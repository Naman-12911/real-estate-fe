import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import axios from 'axios';
import { baseURL } from '../../Constant';
import { toast } from 'sonner';
import { Haptics } from '@capacitor/haptics';

const hapticsVibrate = async () => {
	console.log('vibration started')
	await Haptics.vibrate();
	console.log('vibration ended')
  };

export const initializePushNotifications = (navigate) => {
  if (!Capacitor.isNativePlatform()) {
    console.log('Push notifications are only available on native platforms');
    return;
  }

  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      PushNotifications.register();
    } else {
      // Handle the case where permission is not granted
      console.log('Push notification permission not granted');
    }
  });

  PushNotifications.addListener('registration', token => {
    console.log('Push registration success, token: ' + token.value);
    // Send the token to your server to store it and use it for sending push notifications
	if (token.value) {
		// console.log(token.value);
		axios.get(`${baseURL}account/all-tokens/`,{
			headers:{
				Authorization:`Bearer ${localStorage.getItem('access_token')}`
			}
		  })
		  .then(res=>{
			console.log(res)
			let data=null
			data=res.data.token.find(item=>item==token.value)
			if(data==null){
				axios.post(`${baseURL}account/fcm-token/`,{device_token:token.value},{
					headers:{
						Authorization:`Bearer ${localStorage.getItem('access_token')}`
					}
				  })
				  .then(res=>{
					// console.log(res.data)
				  })
				  .catch(err=>{
					// console.log(err.response.data)
				  })
			}
			else{
				// console.log("Token Already Present");
			}
		  })
		  .catch(err=>{
			// console.log(err.response.data)
		  })
	  // Perform any other neccessary action with the token
	} else {
	  // Show permission request UI
	  console.log('No registration token available. Request permission to generate one.');
	}
  });

  PushNotifications.addListener('registrationError', error => {
    console.error('Push registration error: ', error);
  });

  PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push received: ', JSON.stringify(notification));
    // Show the notification in your app
	hapticsVibrate();
	toast.info(notification?.title,{
		description:
			notification.body.slice(
			  0,
			  Math.min(
				notification.body.indexOf(',') !== -1 ? notification.body.indexOf(',') : notification.body.length,
				notification.body.indexOf('.') !== -1 ? notification.body.indexOf('.') : notification.body.length
			  )
			)
		  ,
		duration:10000,
		action: {
			label: 'View Lead',
			onClick: () => navigate(`/sale/client/${notification.body.slice(notification.body.indexOf(":")+1)}`)
		  },
	  })
  });

  PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push action performed: ', JSON.stringify(notification));
    // Handle the action performed on the notification
	navigate('/sale/client/')
  });
};
