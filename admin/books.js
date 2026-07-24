// =======================
// Boivana Admin Books JS
// =======================


let books = JSON.parse(
    localStorage.getItem("boivanaBooks")
) || [];



const form = document.querySelector("#book-form");

const bookList = document.querySelector("#book-list");




// Add Book

if(form){

form.addEventListener("submit",(e)=>{


    e.preventDefault();



    let book = {

        id: Date.now(),

        title:
        document.querySelector("#book-title").value,


        price:
        Number(document.querySelector("#book-price").value),


        image:
        document.querySelector("#book-image").value

    };



    books.push(book);



    localStorage.setItem(
        "boivanaBooks",
        JSON.stringify(books)
    );



    alert("Book Added ✅");


    form.reset();


    showBooks();


});

}




// Show Books

function showBooks(){


    if(!bookList) return;



    bookList.innerHTML="";



    books.forEach((book,index)=>{


        let div =
        document.createElement("div");


        div.classList.add("cart-card");



        div.innerHTML = `


        <div>

        <h3>${book.title}</h3>

        <p>
        ৳${book.price}
        </p>

        <p>
        ${book.image}
        </p>


        <button onclick="deleteBook(${index})">

        Delete

        </button>


        </div>


        `;



        bookList.appendChild(div);



    });


}




// Delete Book

function deleteBook(index){


    books.splice(index,1);



    localStorage.setItem(
        "boivanaBooks",
        JSON.stringify(books)
    );



    showBooks();


}





showBooks();
