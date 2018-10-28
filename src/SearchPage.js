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

    componentDidMount() {
        BooksAPI.getAll().then(response => {
            this.setState({books: response}
            )
        });
    }

    updateQuery = (query) => {
        this.setState({query: query}, this.searchBooks)
    }

    searchBooks() {
        if (this.state.query === '' || this.state.query === undefined) {
            return this.setState({searchBooks: []});
        }
        BooksAPI.search(this.state.query.trim()).then(response => {
            if (!response.error) {
                response.forEach(element => {
                    let filter = this.state.books.filter(book => book.id === element.id);
                    element.shelf = filter[0] ? filter[0].shelf : null;
                    console.log('shelf ' + element.shelf)
                });
                return this.setState({searchBooks: response})
            } else {
                return this.setState({searchBooks: []});
            }
        });
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
                            <Books updateBook={this.updateBook}
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