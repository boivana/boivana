import { auth } from "./firebase-auth.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

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
