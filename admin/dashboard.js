// =======================
// Boivana Admin Dashboard Firebase
// =======================


import { db } from "../assets/js/firebase.js";


import {
    collection,
    getDocs
} from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";





async function loadDashboard(){


    const snapshot = await getDocs(
        collection(db,"orders")
    );



    let totalOrders = 0;

    let pendingOrders = 0;

    let deliveredOrders = 0;



    snapshot.forEach(doc=>{


        let order = doc.data();


        totalOrders++;



        if(order.status==="Pending"){

            pendingOrders++;

        }



        if(order.status==="Delivered"){

            deliveredOrders++;

        }



    });




    document.querySelector("#total-orders")
    .innerText = totalOrders;



    document.querySelector("#pending-orders")
    .innerText = pendingOrders;



    document.querySelector("#delivered-orders")
    .innerText = deliveredOrders;



}



loadDashboard();
