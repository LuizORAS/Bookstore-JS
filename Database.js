module.exports = class Database {
    //DATABASE USANDO OBJETO COMO ARMAZENAMENTO DA APLICAÇÃO
    #storage = {
        authors: [],
        books: [],
        posters: [],
        orders: [],
        users: []
    }
    
    //ACHAR ALGO ESPECIFICO
    find(key){
        return this.#storage[key]
    }
    //ADICIONAR AUTOR
    saveAuthor(author){
        this.#storage.authors.push(author)
    }
    //METODOS RELACIONADO A LIVROS
    saveBook(book){
        const Bookexists = this.findBookByName(book.name)
        if(!Bookexists){
            this.#storage.books.push(book)
        }

    }
    findBookByName (bookName){
        return this.#storage.books.find(b => b.name === bookName)
    }
    addBookToStock(bookName, quantity){
        const book = this.findBookByName(bookName)
        book?.addStock(quantity)
    }
    removeBookFromStock(bookName, quantity){
        const book = this.findBookByName(bookName)
        book?.removeStock(quantity)
    }
    //POSTERS
    //
    //
    //
    savePoster(poster){
        const posterExist = this.findPosterByName(poster.name)
        if(!posterExist){
            this.#storage.posters.push(poster)
        }

    }
    findPosterByName (posterName){
        return this.#storage.posters.find(p => p.name === bookName)
    }
    addPosterToStock(posterName, quantity){
        const poster = this.findPosterByName(posterName)
        poster?.addStock(quantity)
    }
    removePosterFromStock(posterName, quantity){
        const poster = this.findPosterByName(posterName)
        poster?.removeStock(quantity)
    }
    //
    //
    //
    //CRIAÇÃO DE USUARIOS E METODOS
    saveUser(user){
        const userExist = this.#storage.users.find(u => u.email === user.email)
        if(!userExist){
            this.#storage.users.push(user)
        }

    }
    //FINALIZAR PEDIDO
    saveOrder(order){
        this.#storage.orders.push(order)
    }
    //TABLE STORAGE
    showStorage(){
        console.table(this.#storage.authors)
        console.table(this.#storage.books)
        console.table(this.#storage.posters)
        console.table(this.#storage.users)
        console.table(this.#storage.orders.map(order => order.data))

    }
}