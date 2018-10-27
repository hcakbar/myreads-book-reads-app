import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from "./BooksAPI";
import Books from './Books'

class SearchPage extends React.Component {
    state = {
        books: [],
        searchBooks: [],
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query}, this.searchBooks)
    }

    searchBooks() {
        if (this.state.query) {
            BooksAPI.search(this.state.query.trim()).then(response => {
                if (response.error) {
                    return this.setState({searchBooks: []});
                } else {
                    return this.setState({searchBooks: response});
                }
            });
        } else {
            return this.setState({response: []});
        }
    }

    updateShelf = (newBook, shelf) => {
        BooksAPI.update(newBook, shelf).then(() => {
            newBook.shelf = shelf;
            let updateBook = this.state.books.filter(book => book.id != newBook.id);
            updateBook.push(newBook);
            this.setState({books : updateBook})

        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type='text' placeholder="Search by title or author" value={this.state.query}
                               onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchBooks.map((book, key) =>
                            <Books updateBook={this.updateShelf}
                                   key={key}
                                   book={book}/>)
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage