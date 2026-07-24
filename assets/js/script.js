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
