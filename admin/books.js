// =======================
// Boivana Admin Books Firebase
// =======================


import { db } from "../assets/js/firebase.js";


import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
}
from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";




const form = document.querySelector("#book-form");

const bookList = document.querySelector("#book-list");





// =======================
// Add Book
// =======================


if(form){


form.addEventListener("submit", async (e)=>{


    e.preventDefault();



    let book = {


        title:
        document.querySelector("#book-title").value,


        price:
        Number(document.querySelector("#book-price").value),


        image:
        document.querySelector("#book-image").value,


        createdAt:
        serverTimestamp()


    };



    try{


        await addDoc(
            collection(db,"books"),
            book
        );



        alert("Book Added ✅");


        form.reset();


        showBooks();


    }


    catch(error){

        console.log(error);

        alert("Failed ❌");

    }



});


}







// =======================
// Show Books
// =======================


async function showBooks(){


    if(!bookList) return;



    bookList.innerHTML="";



    const snapshot =
    await getDocs(
        collection(db,"books")
    );



    snapshot.forEach((item)=>{


        let book = item.data();



        let div =
        document.createElement("div");


        div.classList.add("cart-card");



        div.innerHTML = `


        <div>


        <h3>
        ${book.title}
        </h3>


        <p>
        ৳${book.price}
        </p>


        <p>
        ${book.image}
        </p>



        <button onclick="deleteBook('${item.id}')">
        Delete
        </button>


        </div>


        `;



        bookList.appendChild(div);



    });


}






// =======================
// Delete Book
// =======================


window.deleteBook = async function(id){


    await deleteDoc(
        doc(db,"books",id)
    );


    alert("Book Deleted ✅");


    showBooks();


}





showBooks();
