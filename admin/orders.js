// =======================
// Boivana Admin Orders v2
// =======================
let orders = JSON.parse(
    localStorage.getItem("boivanaOrders")
) || [];


// Old order migration

let oldOrder = JSON.parse(
    localStorage.getItem("boivanaOrder")
);


if(oldOrder && orders.length === 0){

    oldOrder.status = oldOrder.status || "Pending";

    orders.push(oldOrder);


    localStorage.setItem(
        "boivanaOrders",
        JSON.stringify(orders)
    );

}

const orderList = document.querySelector("#order-list");


let orders = JSON.parse(
    localStorage.getItem("boivanaOrders")
) || [];




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
        Products:
        </p>


        ${
        order.products.map(item=>
        `
        <p>
        ${item.title} × ${item.quantity}
        </p>
        `
        ).join("")
        }



        <p>
        Status:
        </p>



        <select onchange="changeStatus(${index}, this.value)">


        <option 
        ${order.status==="Pending"?"selected":""}>
        Pending
        </option>


        <option
        ${order.status==="Confirmed"?"selected":""}>
        Confirmed
        </option>


        <option
        ${order.status==="Delivered"?"selected":""}>
        Delivered
        </option>


        </select>



        <br><br>



        <button onclick="deleteOrder(${index})">
        Delete
        </button>



        </div>


        `;



        orderList.appendChild(div);



    });


}




// Change Status

function changeStatus(index,status){


    orders[index].status = status;


    localStorage.setItem(
        "boivanaOrders",
        JSON.stringify(orders)
    );


    alert("Order status updated ✅");


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
