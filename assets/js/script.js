// =======================
// Boivana v3 JavaScript
// =======================


// Firebase

import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";




// Cart Data

let cart = JSON.parse(
    localStorage.getItem("boivanaCart")
) || [];




// =======================
// Cart Save
// =======================

function saveCart(){

    localStorage.setItem(
        "boivanaCart",
        JSON.stringify(cart)
    );

}





// =======================
// Cart Count
// =======================

function updateCartCount(){

    const count =
    document.querySelector("#cart-count");


    if(count){

        let total = 0;


        cart.forEach(item=>{

            total += item.quantity || 1;

        });


        count.innerText = total;

    }

}


updateCartCount();





// =======================
// Load Books Firebase
// =======================


const bookContainer =
document.querySelector("#book-container");



async function loadBooks(){


    if(!bookContainer) return;



    bookContainer.innerHTML =
    "Loading books...";



    const snapshot =
    await getDocs(
        collection(db,"books")
    );



    bookContainer.innerHTML="";



    snapshot.forEach((doc)=>{


        let book = doc.data();



        let div =
        document.createElement("div");



        div.classList.add("book");



        div.innerHTML = `


        <img src="${book.image}" width="120">


        <h3>
        ${book.title}
        </h3>


        <p>
        ৳${book.price}
        </p>


        <button class="buy-btn">
        Buy Now
        </button>


        `;



        bookContainer.appendChild(div);



    });



}



loadBooks();






// =======================
// Buy Now Dynamic
// =======================


document.addEventListener(
"click",
(e)=>{


    if(
    e.target.classList.contains("buy-btn")
    ){


        const bookCard =
        e.target.closest(".book");



        const book = {


            title:
            bookCard.querySelector("h3").innerText,


            price:
            Number(
            bookCard.querySelector("p")
            .innerText
            .replace("৳","")
            .trim()
            ),


            image:
            bookCard.querySelector("img").src,


            quantity:1


        };



        cart.push(book);



        saveCart();



        alert(
        book.title+
        " added to cart 🛒"
        );



        updateCartCount();


    }


});






// =======================
// Search
// =======================


const searchInput =
document.querySelector("input");



if(searchInput){


searchInput.addEventListener(
"keyup",
()=>{


let value =
searchInput.value.toLowerCase();



document.querySelectorAll(".book")
.forEach(book=>{


let text =
book.innerText.toLowerCase();

// =======================
// Show Cart Items
// =======================

const cartItems = document.querySelector("#cart-items");
    console.log(cart);
console.log(cartItems);
const totalPrice = document.querySelector("#total-price");

if (cartItems) {

    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
        <div style="text-align:center;padding:40px;">
            <h2>🛒 Your cart is empty</h2>
            <br>
            <a href="index.html">Continue Shopping</a>
        </div>
        `;

    } else {

        cart.forEach((item, index) => {

            if (!item.quantity) item.quantity = 1;

            total += item.price * item.quantity;
            totalItems += item.quantity;

            const div = document.createElement("div");

            div.className = "cart-card";

            div.innerHTML = `
                <img src="${item.image}" width="120">

                <div class="cart-info">

                    <h3>${item.title}</h3>

                    <p>৳${item.price}</p>

                    <div class="quantity-box">

                        <button onclick="changeQuantity(${index},-1)">−</button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${index},1)">+</button>

                    </div>

                    <button onclick="removeCart(${index})">
                        🗑 Remove
                    </button>

                </div>
            `;

            cartItems.appendChild(div);

        });

    }

    if (totalPrice) totalPrice.innerText = total;

    const count = document.querySelector("#cart-count");
    if (count) count.innerText = totalItems;

}



// =======================
// Remove Cart
// =======================

window.removeCart = function(index){

    cart.splice(index,1);

    saveCart();

    location.reload();

};



// =======================
// Change Quantity
// =======================

window.changeQuantity = function(index,value){

    cart[index].quantity += value;

    if(cart[index].quantity < 1){

        cart[index].quantity = 1;

    }

    saveCart();

    location.reload();

};

book.style.display =
text.includes(value)
?
"block"
:
"none";


});


});


}
