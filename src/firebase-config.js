const config = {
  apiKey: 'AIzaSyBKJctGhOgGaYPBBOaPbqg7_yWMigJuRSw',
  authDomain: 'library-b2f91.firebaseapp.com',
  projectId: 'library-b2f91',
  storageBucket: 'library-b2f91.appspot.com',
  messagingSenderId: '869357530244',
  appId: '1:869357530244:web:2c2786508ded536cc726d1',
};

export default function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
