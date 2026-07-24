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



book.style.display =
text.includes(value)
?
"block"
:
"none";


});


});


}
