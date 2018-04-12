import firebase from 'firebase'

const App = firebase.initializeApp({    
  apiKey: 'AIzaSyCnQPpuJ9dY-f40SCulXsTZS-Ld2VkAA-c',
  authDomain: 'use-abuse.firebaseapp.com',
  databaseURL: 'https://use-abuse.firebaseio.com',
  projectId: 'use-abuse',
  storageBucket: 'use-abuse.appspot.com',
  messagingSenderId: '332404837457'
})

export default App
