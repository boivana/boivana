// =======================
// Boivana Checkout JS
// =======================


let cart = JSON.parse(localStorage.getItem("boivanaCart")) || [];



const checkoutItems = document.querySelector("#checkout-items");

const checkoutTotal = document.querySelector("#checkout-total");



let total = 0;



// Show Checkout Items

if(checkoutItems){


    if(cart.length === 0){

        checkoutItems.innerHTML =
        "<h3>Your cart is empty 🛒</h3>";

    }



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



    checkoutTotal.innerText = total;


}





// Place Order


const orderForm = document.querySelector("#order-form");



if(orderForm){


    orderForm.addEventListener("submit",(e)=>{


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


            products:cart,


            total:total,


            status:"Pending",


            date:new Date().toISOString()


        };



        localStorage.setItem(
            "boivanaOrder",
            JSON.stringify(order)
        );



        localStorage.removeItem("boivanaCart");



        alert("Order placed successfully ✅");



        window.location.href="index.html";


    });


}
