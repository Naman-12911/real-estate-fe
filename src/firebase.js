import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage} from 'firebase/messaging';
import Axios from './Axios';
import axios from 'axios';
import { baseURL } from './Constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Replace this firebaseConfig object with the congurations for the project you created on your firebase console. 
const firebaseConfig = {
	apiKey: "AIzaSyDi_bOkpfITbFN-G_ylsCEWx3P_ISr4QmU",
	authDomain: "ci-builders.firebaseapp.com",
	projectId: "ci-builders",
	storageBucket: "ci-builders.appspot.com",
	messagingSenderId: "949776806313",
	appId: "1:949776806313:web:701ba2bbe0a85af0f714b8"
  };

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);


export const requestForToken = () => {
	return getToken(messaging, { vapidKey:"BJWNMT-64WFgXWq06ptrU3TBooUDXawYcAG3f1bUTjZEYWnaaA0enQNbKN4c2H0LLIXmKP46aTS8wchbEX-ef04"})
	  .then((currentToken) => {
		if (currentToken) {
			// console.log(currentToken);
			axios.get(`${baseURL}account/all-tokens/`,{
				headers:{
					Authorization:`Bearer ${localStorage.getItem('access_token')}`
				}
			  })
			  .then(res=>{
				let data=null
				data=res.data.token.find(item=>item==currentToken)
				if(data==null){
					axios.post(`${baseURL}account/fcm-token/`,{device_token:currentToken},{
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
	  })
	  .catch((err) => {
		console.log('An error occurred while retrieving token. ', err);
	  });
  };

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
		console.log('wosdad')
    if(payload?.notification?.title=='Ticket Raised'){
		toast.info(payload?.notification?.title,{
			description:payload?.notification?.body,
			duration:10000,
			action: {
				label: 'View Ticket',
				onClick: () => window.location.href =`https://cibuilders.co.in/admin/tickets`
			  },
		  }) 
	}else{
		toast.info(payload?.notification?.title,{
			description:payload?.notification?.body,
			duration:10000,
			action: {
				label: 'View Lead',
				onClick: () => window.location.href =`https://cibuilders.co.in/sale/client/${payload.notification.body.slice(payload.notification.body.indexOf(":")+1)}`
			  },
		  }) 
	}
	  
      resolve(payload);
	  
    });
  });

initializeApp(firebaseConfig);