// Boivana Authentication

import { auth } from "./firebase-auth.js";


import {

signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signOut,
onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";




// LOGIN

window.loginUser = async function(){


const email =
document.querySelector("#email").value.trim();


const password =
document.querySelector("#password").value;



if(!email || !password){

alert("Email and password required");

return;

}



try{


await signInWithEmailAndPassword(

auth,
email,
password

);



alert("Login successful ✅");


window.location.href="index.html";



}

catch(error){


alert(error.message);


}



};





// REGISTER

window.registerUser = async function(){


const email =
document.querySelector("#email").value.trim();


const password =
document.querySelector("#password").value;



try{


await createUserWithEmailAndPassword(

auth,
email,
password

);



alert("Account created ✅");


window.location.href="login.html";


}

catch(error){


alert(error.message);


}



};






// LOGOUT


window.logoutUser = async function(){


await signOut(auth);


window.location.href="login.html";


};





// CHECK LOGIN


onAuthStateChanged(auth,(user)=>{


let page =
window.location.pathname;


if(

!user &&

!page.includes("login.html") &&

!page.includes("register.html")

){


window.location.href="login.html";


}



});
