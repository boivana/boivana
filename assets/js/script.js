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
