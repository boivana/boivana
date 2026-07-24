// Boivana JavaScript

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

if(menuBtn){
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}


// Cart Counter
let cartCount = 0;

const cartButtons = document.querySelectorAll(".buy-btn");

cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        cartCount++;
        alert("Book added to cart! Total books: " + cartCount);
    });
});
// Book Search System

const searchInput = document.querySelector("#search");

if(searchInput){
    searchInput.addEventListener("keyup", function(){
        let value = searchInput.value.toLowerCase();

        let books = document.querySelectorAll(".book-card");

        books.forEach(book => {
            let title = book.innerText.toLowerCase();

            if(title.includes(value)){
                book.style.display = "block";
            }else{
                book.style.display = "none";
            }
        });
    });
}


// Category Filter

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        let category = btn.innerText.toLowerCase();

        let books = document.querySelectorAll(".book-card");

        books.forEach(book => {

            let bookCategory = book.dataset.category;

            if(category === "all" || bookCategory === category){
                book.style.display = "block";
            }else{
                book.style.display = "none";
            }

        });

    });
});
// Boivana Cart System

let cart = JSON.parse(localStorage.getItem("boivanaCart")) || [];

const buyButtons = document.querySelectorAll(".buy-btn");

buyButtons.forEach(button => {

    button.addEventListener("click", () => {

        const bookCard = button.closest(".book-card");

        const book = {
            title: bookCard.querySelector("h3").innerText,
            price: bookCard.querySelector(".price").innerText
        };

        cart.push(book);

        localStorage.setItem("boivanaCart", JSON.stringify(cart));

        alert(book.title + " added to cart 🛒");

        updateCartCount();

    });

});


// Cart Count Update

function updateCartCount(){

    const cartCount = document.querySelector("#cart-count");

    if(cartCount){
        cartCount.innerText = cart.length;
    }

}

updateCartCount();
