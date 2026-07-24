// =======================
// Boivana Customer Auth
// =======================


import { auth } from "./firebase-auth.js";


import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
}
from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";




// Register

window.registerUser = async function(){

    let email =
    document.querySelector("#email").value;


    let password =
    document.querySelector("#password").value;


    try{

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );


        alert("Account created ✅");


        window.location.href =
        "login.html";


    }
    catch(error){

        alert(error.message);

    }

}





// Login

window.loginUser = async function(){


    let email =
    document.querySelector("#email").value;


    let password =
    document.querySelector("#password").value;



    try{


        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        alert("Login successful ✅");


        window.location.href =
        "index.html";


    }
    catch(error){

        alert(error.message);

    }


}






// Logout

window.logoutUser = async function(){


    await signOut(auth);


    alert("Logged out ✅");


    location.reload();

import {
    onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";



onAuthStateChanged(auth,(user)=>{


    let page =
    window.location.pathname;



    if(!user && !page.includes("login.html") && !page.includes("register.html")){


        window.location.href =
        "login.html";


    }



});
}
