// =======================
// Boivana JavaScript
// =======================


// =======================
// Cart Data
// =======================

let cart = JSON.parse(localStorage.getItem("boivanaCart")) || [];



// =======================
// Buy Now Button
// =======================

const buyButtons = document.querySelectorAll(".buy-btn");


buyButtons.forEach(button => {

    button.addEventListener("click", () => {


        const bookCard = button.closest(".book");


        const book = {

            title: bookCard.querySelector("h3").innerText,

            price: bookCard.querySelector("p").innerText

        };


        cart.push(book);


        localStorage.setItem(
            "boivanaCart",
            JSON.stringify(cart)
        );


        alert(book.title + " added to cart 🛒");


        updateCartCount();


    });

});




// =======================
// Cart Count
// =======================

function updateCartCount(){

    const count = document.querySelector("#cart-count");


    if(count){

        count.innerText = cart.length;

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


        const books = document.querySelectorAll(".book");


        books.forEach(book=>{


            let text = book.innerText.toLowerCase();


            if(text.includes(value)){

                book.style.display="block";

            }
            else{

                book.style.display="none";

            }


        });


    });

}





// =======================
// Show Cart Items
// =======================

const cartItems = document.querySelector("#cart-items");

const totalPrice = document.querySelector("#total-price");



if(cartItems){


    let total = 0;



    cart.forEach((item,index)=>{


        let price = Number(
            item.price.replace("৳","").trim()
        );


        total += price;



        let div = document.createElement("div");


        div.classList.add("cart-card");



        div.innerHTML = `

<h3>${item.title}</h3>

<p>${item.price}</p>

<div>
<button onclick="changeQuantity(${index}, -1)">-</button>

<span>${item.quantity || 1}</span>

<button onclick="changeQuantity(${index}, 1)">+</button>
</div>

<button onclick="removeCart(${index})">
Remove
</button>

`;


        cartItems.appendChild(div);



    });



    if(totalPrice){

        totalPrice.innerText = total;

    }


}





// =======================
// Remove Cart Item
// =======================

function removeCart(index){


    cart.splice(index,1);



    localStorage.setItem(
        "boivanaCart",
        JSON.stringify(cart)
    );



    location.reload();


}
