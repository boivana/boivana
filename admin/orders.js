// =======================
// Boivana Admin Orders JS
// =======================


const orderList = document.querySelector("#order-list");


// Get Order

let orders = JSON.parse(
    localStorage.getItem("boivanaOrders")
) || [];



// Temporary support
// যদি পুরোনো single order থাকে

let oldOrder = JSON.parse(
    localStorage.getItem("boivanaOrder")
);


if(oldOrder && orders.length === 0){

    orders.push(oldOrder);


    localStorage.setItem(
        "boivanaOrders",
        JSON.stringify(orders)
    );

}




// Show Orders

function showOrders(){


    if(!orderList) return;


    orderList.innerHTML="";



    if(orders.length === 0){

        orderList.innerHTML =
        "<h3>No orders found 🛒</h3>";

        return;

    }




    orders.forEach((order,index)=>{


        let div = document.createElement("div");


        div.classList.add("cart-card");



        div.innerHTML = `


        <div>


        <h3>
        Order #${index+1}
        </h3>


        <p>
        Name: ${order.customerName}
        </p>


        <p>
        Phone: ${order.phone}
        </p>


        <p>
        Address: ${order.address}
        </p>


        <p>
        Payment: ${order.payment}
        </p>


        <p>
        Total: ৳${order.total}
        </p>



        <p>
        Status:
        ${order.status}
        </p>



        <h4>
        Products:
        </h4>



        ${
        order.products.map(item=>

        `<p>
        ${item.title} × ${item.quantity}
        </p>`

        ).join("")
        }



        <button onclick="deleteOrder(${index})">

        Delete

        </button>



        </div>


        `;



        orderList.appendChild(div);



    });


}




// Delete Order

function deleteOrder(index){


    orders.splice(index,1);



    localStorage.setItem(
        "boivanaOrders",
        JSON.stringify(orders)
    );



    showOrders();


}




showOrders();
