// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: "AIzaSyDi_bOkpfITbFN-G_ylsCEWx3P_ISr4QmU",
	authDomain: "ci-builders.firebaseapp.com",
	projectId: "ci-builders",
	storageBucket: "ci-builders.appspot.com",
	messagingSenderId: "949776806313",
	appId: "1:949776806313:web:701ba2bbe0a85af0f714b8"
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});