//Book constructor
function Book(title,author,isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;

}









//UI constructor
function UI(){}
  
// adding book to the table
UI.prototype.addBookToList=function (book) {
    const list=document.getElementById("book-list");   // note book-list in tbody of html 
    // create tr (table row) element
    const row=document.createElement("tr");
    //insert coloumns   to td table data cell
    row.innerHTML= ` 
      <td>${book.title}</td>                         
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>     
      `;                                               // this will add delete symbol in list
        list.appendChild(row);

}

//Show alert
UI.prototype.showAlert=function(message,className){
  const div=document.createElement("div")  //create div
  div.className="alert ${className}"  //add classes
  div.appendChild(document.createTextNode(message));
  // get parent
  const container=document.querySelector(".container");
  const form=document.querySelector("#book-form");
  //insert
  container.insertBefore(div,form);

  //set timeoot so that popup msg dellete after 30 sec or 3000millsecond
  setTimeout(function(){
    document.querySelector(".alert")
    .remove();
  },3000);


}


// delete book
UI.prototype.deleteBook= function(target) {
  if(target.className==="delete"){
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields of list too enter new as by saving in row

UI.prototype.clearFields=function(){
  document.getElementById("title").value=""  // we making emty or deleting older 
  document.getElementById("author").value=""
  document.getElementById("isbn").value=""
}




//Event listener for add book
document.getElementById("book-form").addEventListener("submit",function(e){
  // get form values
  const title = document.getElementById("title").value,
        author=document.getElementById("author").value,
        isbn=document.getElementById("isbn").value
  
        // Instabtiate book
  const book= new Book(title,author,isbn);   // Book is object here main Book we defined is class
  

     // instantiate UI
  const ui=new UI();

     // alert if not book added and clicked submit button
  if(title==="" ||author===""||isbn===""){   // if none value filled and submitted means 
    ui.showAlert("please fill in all ","error")   //alert("failed") but it is not proffesional


  }else{                   // by hitting submit button it stil add empty list in row so else is used
    // add book list
  ui.addBookToList(book);  // clling function addBookLists

  // show success
  ui.showAlert("Book added","success")

  // clear field
  ui.clearFields();    // calling function clearFields

  }



  

e.preventDefault(); // we r stopping automaticslly submitting button
})


// event listeners for delition

document.getElementById("book-list").addEventListener("click",function(e){
  const ui=new UI();
  ui.deleteBook(e.target); 
  e.preventDefault()
})