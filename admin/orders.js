// =======================
// Boivana Admin Orders Firebase
// =======================


import { db } from "../assets/js/firebase.js";


import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



const orderList = document.querySelector("#order-list");



let orders = [];





// =======================
// Load Orders From Firebase
// =======================

async function loadOrders(){


    orderList.innerHTML = "Loading orders...";



    const querySnapshot = await getDocs(
        collection(db,"orders")
    );



    orders = [];



    querySnapshot.forEach((doc)=>{


        orders.push({

            id: doc.id,

            ...doc.data()

        });


    });



    showOrders();


}






// =======================
// Show Orders
// =======================

function showOrders(){


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



        <p>
        Status:
        </p>



        <select onchange="changeStatus('${order.id}', this.value)">



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



        <button onclick="deleteOrder('${order.id}')">
        Delete
        </button>



        </div>


        `;



        orderList.appendChild(div);



    });



}





// =======================
// Update Status
// =======================

window.changeStatus = async function(id,status){


    await updateDoc(
        doc(db,"orders",id),
        {
            status:status
        }
    );


    alert("Status updated ✅");


    loadOrders();


}





// =======================
// Delete Order
// =======================

window.deleteOrder = async function(id){


    await deleteDoc(
        doc(db,"orders",id)
    );


    alert("Order deleted ✅");


    loadOrders();


}






loadOrders();
