// =======================
// Boivana v4 Script
// =======================

// Firebase

import { db } from "./firebase.js";

import {
    collection,
    getDocs
}
from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// =======================
// Cart Data
// =======================

let cart = JSON.parse(
    localStorage.getItem("boivanaCart")
) || [];


// =======================
// Save Cart
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

    if(!count) return;

    let total = 0;

    cart.forEach(item=>{

        total += item.quantity || 1;

    });

    count.innerText = total;

}

updateCartCount();


// =======================
// Load Books
// =======================

const bookContainer =
document.querySelector("#book-container");

async function loadBooks(){

    if(!bookContainer) return;

    bookContainer.innerHTML =
    "<h2>Loading books...</h2>";

    const snapshot =
    await getDocs(
        collection(db,"books")
    );

    bookContainer.innerHTML="";

    snapshot.forEach((doc)=>{

        const book = doc.data();

        const div =
        document.createElement("div");

        div.className="book";

        div.innerHTML=`

        <img src="${book.image}" alt="${book.title}">

        <h3>${book.title}</h3>

        <p>৳${book.price}</p>

        <button class="buy-btn">
            Buy Now
        </button>

        `;

        bookContainer.appendChild(div);

    });

}

loadBooks();


// =======================
// Buy Now
// =======================

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("buy-btn"))
    return;

    const card =
    e.target.closest(".book");

    const book={

        title:
        card.querySelector("h3").innerText,

        price:Number(
        card.querySelector("p")
        .innerText
        .replace("৳","")
        .trim()
        ),

        image:
        card.querySelector("img").src,

        quantity:1

    };

    cart.push(book);

    saveCart();

    updateCartCount();

    alert(book.title+" added to cart 🛒");

});


// =======================
// Search
// =======================

const searchInput =
document.querySelector("input");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value=
searchInput.value.toLowerCase();

document
.querySelectorAll(".book")
.forEach(book=>{

const text=
book.innerText.toLowerCase();

book.style.display=

text.includes(value)

?

"block"

:

"none";

});

});

}
// =======================
// Cart Page
// =======================

const cartItems = document.querySelector("#cart-items");
const totalPrice = document.querySelector("#total-price");

if (cartItems) {

    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
        <div style="text-align:center;padding:50px;">
            <h2>🛒 Your cart is empty</h2>
            <br>
            <a href="index.html">Continue Shopping</a>
        </div>
        `;

    } else {

        cart.forEach((item,index)=>{

            if(!item.quantity){
                item.quantity = 1;
            }

            total += item.price * item.quantity;
            totalItems += item.quantity;

            const card = document.createElement("div");

            card.className = "cart-card";

            card.innerHTML = `

            <img src="${item.image}" alt="${item.title}">

            <div class="cart-info">

                <h3>${item.title}</h3>

                <p>Price : ৳${item.price}</p>

                <div class="quantity-box">

                    <button class="minus-btn" data-index="${index}">
                    −
                    </button>

                    <span>${item.quantity}</span>

                    <button class="plus-btn" data-index="${index}">
                    +
                    </button>

                </div>

                <button class="remove-btn" data-index="${index}">
                    🗑 Remove
                </button>

            </div>

            `;

            cartItems.appendChild(card);

        });

    }

    if(totalPrice){
        totalPrice.innerText = total;
    }

    const count = document.querySelector("#cart-count");

    if(count){
        count.innerText = totalItems;
    }

}



// =======================
// Cart Buttons
// =======================

document.addEventListener("click",(e)=>{

    // Remove

    if(e.target.classList.contains("remove-btn")){

        const index =
        Number(e.target.dataset.index);

        cart.splice(index,1);

        saveCart();

        location.reload();

    }

    // Plus

    if(e.target.classList.contains("plus-btn")){

        const index =
        Number(e.target.dataset.index);

        cart[index].quantity++;

        saveCart();

        location.reload();

    }

    // Minus

    if(e.target.classList.contains("minus-btn")){

        const index =
        Number(e.target.dataset.index);

        if(cart[index].quantity>1){

            cart[index].quantity--;

        }

        saveCart();

        location.reload();

    }

});


// =======================
// Checkout
// =======================

const checkoutBtn =
document.querySelector("#checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click",()=>{

        if(cart.length===0){

            alert("Your cart is empty!");

            return;

        }

        window.location.href="checkout.html";

    });

}
