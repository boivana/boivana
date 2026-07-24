// =======================
// Boivana Customer Auth
// =======================

import { auth } from "./firebase-auth.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


// =======================
// Register
// =======================

window.registerUser = async function () {

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    try {

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Account created successfully ✅");

        location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }

};


// =======================
// Login
// =======================

window.loginUser = async function () {

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Login successful ✅");

        location.href = "index.html";

    } catch (error) {

        alert(error.message);

    }

};


// =======================
// Logout
// =======================

window.logoutUser = async function () {

    try {

        await signOut(auth);

        location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }

};


// =======================
// Login Protection
// =======================

onAuthStateChanged(auth, (user) => {

    const page = location.pathname.split("/").pop();

    const publicPages = [
        "login.html",
        "register.html"
    ];

    if (!user && !publicPages.includes(page)) {

        location.replace("login.html");

    }

});
