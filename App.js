//imports
const Database = require('./Database.js')
const User = require('./entities/User.js')
const Author = require('./entities/Author.js')
const Book = require('./entities/Book.js')
const Poster = require('./entities/Poster.js')
const Order = require('./entities/Order.js')

module.exports = class App {
    static #database = new Database()

    createUser(name, email, password){
        const user = new User(name, email, password)
        App.#database.saveUser(user)
    }
    getUsers(){
        return App.#database.find('users')
    }
    createAuthor(name, nationality, bio){
        const author = new Author(name, nationality, bio)
        App.#database.saveAuthor(author)
    }
    getAuthors(){
        return App.#database.find('authors')
    }
    //books
    createBook(title, synopsis, genre, pages, author, description, price, inStock ) {
        const book = new Book(title, synopsis, genre, pages, author, description, price, inStock)
        App.#database.saveBook(book)
    }
    addBook(bookName, quantity){
        App.#database.addBookToStock(bookName, quantity)
    }
    getBooks(){
        App.#database.find('books')
    }
    //posters
    createPoster(name, height, width, description, price, inStock ) {
        const poster = new Poster(name, height, width, description, price, inStock)
        App.#database.savePoster(poster)
    }
    addPoster(posterName, quantity){
        App.#database.addPosterToStock(posterName, quantity)
    }
    getPosters(){
        App.#database.find('posters')
    }
    //fazer o pedido
    createOrder(items, user){
        const order = new Order(items, user)
        App.#database.saveOrder(order)
        order.data.items.forEach(({product, quantity}) => {
            if(product instanceof Book){
                App.#database.removeBookFromStock(product.name, quantity)
            }else if(product instanceof Poster){
                App.#database.removePosterFromStock(product.name, quantity)
            }
        })
    }
    //pegar o pedido
    getOrders(){
        return App.#database.find('orders')
    }
    showDatabase(){
        App.#database.showStorage()
    }

}