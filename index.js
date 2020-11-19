//1. store all the data to the local stroage
//2. given another option as option to delete the book
//3. add a scroll bar to the view




console.log("This is index.js");

//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display contructor
function Display() {

}

//Add method to display prototype
Display.prototype.add = function (book) {
    console.log("Adding to ui");
    let tableBody = document.getElementById('tableBody');
    let uiString = `      <tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
    tableBody.innerHTML += uiString;
}

//implementing the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//implementing the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
}


Display.prototype.show = function (type, msg) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message: </strong> ${msg}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
    setTimeout(() => {

        message.innerHTML = '';
    }, 2000)

}


//Add submit event listener to library form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);


function libraryFormSubmit(e) {
    console.log("You have submitted library form");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    //fiction, programming, cooking
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display()
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Success! Your book has been successfully added.');
    } else {
        //show error to the user
        display.show('danger', 'Error! Sorry you cannot add this book.');
    }

    e.preventDefault();
}
