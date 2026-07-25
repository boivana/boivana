// =======================
// Boivana Checkout Firebase JS
// =======================


import { db } from "./firebase.js";


import {
    collection,
    addDoc,
    serverTimestamp
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";





let cart = JSON.parse(
    localStorage.getItem("boivanaCart")
) || [];



const checkoutItems = document.querySelector("#checkout-items");

const checkoutTotal = document.querySelector("#checkout-total");



let total = 0;




// Show checkout items

if(checkoutItems){


    cart.forEach(item=>{


        total += item.price * item.quantity;



        let div = document.createElement("div");


        div.classList.add("cart-card");



        div.innerHTML = `

        <img src="${item.image}" width="100">


        <div>

        <h3>${item.title}</h3>

        <p>
        ৳${item.price} × ${item.quantity}
        </p>


        </div>

        `;


        checkoutItems.appendChild(div);


    });



    const delivery = 60;

document.querySelector("#subtotal").innerText = total;

checkoutTotal.innerText = total + delivery;


}





// Place Order

const orderForm = document.querySelector("#order-form");



if(orderForm){


orderForm.addEventListener("submit", async (e)=>{


    e.preventDefault();



    const order = {


        customerName:
        document.querySelector("#name").value,


        phone:
        document.querySelector("#phone").value,


        address:
        document.querySelector("#address").value,


        payment:
        document.querySelector("#payment").value,


        products: cart,


        total: total,


        status:"Pending",


        date: serverTimestamp()

    };





    try{


        await addDoc(
            collection(db,"orders"),
            order
        );



        localStorage.removeItem(
            "boivanaCart"
        );



        window.location.href =
        "order-success.html";



    }


    catch(error){


        console.log(error);


        alert(
        "Order failed ❌"
        );


    }



});


}
