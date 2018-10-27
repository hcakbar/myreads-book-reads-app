import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'


class HomePage extends React.Component{

    state = {
        books: []
    }

    componentDidMount(){
        BooksAPI.getAll().then(response => {
            this.setState({books: response})
        })
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf;
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([book])
            }));
        });
    }

    render() {
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {/*--*/}
                        <BookShelf updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />
                        <BookShelf updateBook={this.updateBook} name="Want to Reading" books={this.state.books.filter(b => b.shelf === "wantToRead")} />
                        <BookShelf updateBook={this.updateBook} name="Read" books={this.state.books.filter(b => b.shelf === "read")} />
                        {/*--*/}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default HomePage