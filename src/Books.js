import React from 'react'

class Books extends React.Component {
    render() {

        //check and get thumbnail from image link
        let bookImage;
        if(this.props.book.imageLinks) {
            bookImage = this.props.book.imageLinks.thumbnail;
        } else {
            bookImage = "Sorry No Book Image"
        }
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 192,
                        backgroundImage: `url("${bookImage}")`
                    }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => { this.props.updateBook(this.props.book, event.target.value)}}
                                value={this.props.book.shelf || "No Shelf"}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors || "No Author Found"}</div>
            </div>
        )
    }
}


export default Books