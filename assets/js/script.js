// Boivana JavaScript


// =======================
// Mobile Menu
// =======================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

if(menuBtn && nav){
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}



// =======================
// Cart System
// =======================

let cart = JSON.parse(localStorage.getItem("boivanaCart")) || [];


// Add To Cart

const buyButtons = document.querySelectorAll(".buy-btn");

buyButtons.forEach(button => {

    button.addEventListener("click", () => {

        const bookCard = button.closest(".book");

        const book = {
            title: bookCard.querySelector("h3").innerText,
            price: bookCard.querySelector(".price").innerText
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



// Cart Count

function updateCartCount(){

    const cartCount = document.querySelector("#cart-count");

    if(cartCount){
        cartCount.innerText = cart.length;
    }

}

updateCartCount();





// =======================
// Search System
// =======================

const searchInput = document.querySelector("#search");


if(searchInput){

    searchInput.addEventListener("keyup", function(){

        let value = searchInput.value.toLowerCase();

        let books = document.querySelectorAll(".book");


        books.forEach(book => {

            let title = book.innerText.toLowerCase();


            if(title.includes(value)){
                book.style.display = "block";
            }
            else{
                book.style.display = "none";
            }

        });

    });

}




// =======================
// Category Filter
// =======================

const categoryButtons = document.querySelectorAll(".category-btn");


categoryButtons.forEach(btn => {

    btn.addEventListener("click", () => {


        let category = btn.innerText.toLowerCase();


        let books = document.querySelectorAll(".book");


        books.forEach(book => {


            let bookCategory = book.dataset.category;


            if(category === "all" || bookCategory === category){

                book.style.display = "block";

            }
            else{

                book.style.display = "none";

            }


        });


    });

});





// =======================
// Display Cart
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
