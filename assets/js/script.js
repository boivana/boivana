// =======================
// Boivana v2 JavaScript
// =======================


// Cart Data

let cart = JSON.parse(localStorage.getItem("boivanaCart")) || [];




// =======================
// Buy Now
// =======================

const buyButtons = document.querySelectorAll(".buy-btn");


buyButtons.forEach(button => {

    button.addEventListener("click",()=>{


        const bookCard = button.closest(".book");


        const book = {

            title: bookCard.querySelector("h3").innerText,

            price: Number(
                bookCard.querySelector("p")
                .innerText
                .replace("৳","")
                .trim()
            ),

            image: bookCard.querySelector("img").src,

            quantity:1

        };


        cart.push(book);


        saveCart();


        alert(book.title + " added to cart 🛒");


        updateCartCount();


    });

});





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


    const count = document.querySelector("#cart-count");


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
// Search Books
// =======================

const searchInput = document.querySelector("input");


if(searchInput){


    searchInput.addEventListener("keyup",()=>{


        let value = searchInput.value.toLowerCase();


        document.querySelectorAll(".book")
        .forEach(book=>{


            let text = book.innerText.toLowerCase();


            book.style.display =
            text.includes(value)
            ? "block"
            : "none";


        });


    });

}





// =======================
// Show Cart
// =======================

const cartItems = document.querySelector("#cart-items");

const totalPrice = document.querySelector("#total-price");



if(cartItems){


    let total = 0;


    if(cart.length === 0){

        cartItems.innerHTML =
        "<h3>Your cart is empty 🛒</h3>";

    }



    cart.forEach((item,index)=>{


        if(!item.quantity){

            item.quantity = 1;

        }


        total += item.price * item.quantity;



        let div = document.createElement("div");


        div.classList.add("cart-card");



        div.innerHTML = `

            <img src="${item.image}" 
            width="100">


            <div>

            <h3>${item.title}</h3>


            <p>৳${item.price}</p>


            <div class="quantity-box">

                <button onclick="changeQuantity(${index},-1)">
                -
                </button>


                <span>
                ${item.quantity}
                </span>


                <button onclick="changeQuantity(${index},1)">
                +
                </button>


            </div>


            <button onclick="removeCart(${index})">
            Remove
            </button>


            </div>

        `;



        cartItems.appendChild(div);



    });



    if(totalPrice){

        totalPrice.innerText = total;

    }


}





// =======================
// Remove Cart
// =======================

function removeCart(index){


    cart.splice(index,1);


    saveCart();


    location.reload();


}





// =======================
// Quantity Change
// =======================

function changeQuantity(index,value){


    cart[index].quantity += value;



    if(cart[index].quantity < 1){

        cart[index].quantity = 1;

    }



    saveCart();


    location.reload();


}
// =======================
// Load Books From Firebase
// =======================

import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



const bookContainer = document.querySelector("#book-container");



async function loadBooks(){


    if(!bookContainer) return;



    bookContainer.innerHTML = "Loading books...";



    const snapshot = await getDocs(
        collection(db,"books")
    );



    bookContainer.innerHTML = "";



    snapshot.forEach((item)=>{


        let book = item.data();



        let div = document.createElement("div");


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
