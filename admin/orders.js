// =======================
// Boivana Admin Orders v2
// =======================


let orders = JSON.parse(
    localStorage.getItem("boivanaOrders")
) || [];



// Old order migration support

let oldOrder = JSON.parse(
    localStorage.getItem("boivanaOrder")
);


if(oldOrder){

    let exists = orders.some(
        item => item.date === oldOrder.date
    );


    if(!exists){

        oldOrder.status =
        oldOrder.status || "Pending";


        orders.push(oldOrder);


        localStorage.setItem(
            "boivanaOrders",
            JSON.stringify(orders)
        );

    }

}




const orderList = document.querySelector("#order-list");





// =======================
// Show Orders
// =======================

function showOrders(){


    if(!orderList) return;


    orderList.innerHTML = "";



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
        Order #${index + 1}
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



        <h4>
        Products:
        </h4>


        ${
            order.products.map(item =>

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


        <select onchange="changeStatus(${index},this.value)">


            <option value="Pending"
            ${order.status==="Pending"?"selected":""}>
            Pending
            </option>


            <option value="Confirmed"
            ${order.status==="Confirmed"?"selected":""}>
            Confirmed
            </option>


            <option value="Delivered"
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





// =======================
// Change Status
// =======================

function changeStatus(index,status){


    orders[index].status = status;



    localStorage.setItem(
        "boivanaOrders",
        JSON.stringify(orders)
    );



    alert("Order status updated ✅");


}






// =======================
// Delete Order
// =======================

function deleteOrder(index){


    orders.splice(index,1);



    localStorage.setItem(
        "boivanaOrders",
        JSON.stringify(orders)
    );



    showOrders();


}





showOrders();
