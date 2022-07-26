
class Book {
  constructor(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  showAlert(message,className) {
    const div = document.createElement('div');

    div.className = className

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.getElementById('form');

    container.insertBefore(div, form)

    setTimeout(function(){
      div.remove();
    },3000)
  }

  addBookToList(book) {
    const tr = document.createElement('tr');
    
    const tableList = document.querySelector('.table-list');

    tr.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete-item">X</a></td>
                               `;

     tableList.appendChild(tr); 
  }

  clearFields() {
    let title = document.querySelector('.title-input')
    let author = document.querySelector('.author-input')
    let isbn = document.querySelector('.isbn-input')

    title.value = '';
    author.value = '';
    isbn.value = '';
  }

}

class Store {
   static getBooks() {
     let books;

     if(localStorage.getItem('books') === null) {
      books = [];
     } else {
      books = JSON.parse(localStorage.getItem('books'))
     }

     return books;
   }

   static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;

      ui.addBookToList(book)
    })
   }

   static addBook(book) {
     const books = Store.getBooks();

     books.push(book)

     localStorage.setItem('books',JSON.stringify(books))
   }

   static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book,index){
      if(book.isbn === isbn) {
       books.splice(index, 1)
      }
    })

    localStorage.setItem('books',JSON.stringify(books))
   }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks())

document.querySelector('.submit-btn').addEventListener('click', function(){
   
  const title = document.querySelector('.title-input').value
  const author = document.querySelector('.author-input').value
  const isbn = document.querySelector('.isbn-input').value

  const book = new Book(title,author,isbn);

  const ui = new UI();

  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill up all fields','alert')
  } else {
    ui.addBookToList(book);

    Store.addBook(book);

    ui.showAlert('Book Added to List','success');

    ui.clearFields();

  }
})

document.querySelector('.table').addEventListener('click',function(e){
  if(e.target.className === 'delete-item') {
     const ui = new UI();

    e.target.parentElement.parentElement.remove()

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book Removed','success')
    
    e.preventDefault();
  }
})


