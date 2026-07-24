// =======================
// Boivana Firebase Auth Config
// =======================


import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";


import {
    getAuth
}
from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";



const firebaseConfig = {

    apiKey: "AIzaSyD5mCgCPkXeCmniGKMRr3-60hLhUiVJf1Q",

    authDomain: "boivana-95d53.firebaseapp.com",

    projectId: "boivana-95d53",

    storageBucket: "boivana-95d53.firebasestorage.app",

    messagingSenderId: "805731979755",

    appId: "1:805731979755:web:47eb7c4177c1b6117a49ae"

};



const app = initializeApp(firebaseConfig);



const auth = getAuth(app);



export { auth };
