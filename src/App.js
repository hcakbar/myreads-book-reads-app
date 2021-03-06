import React from 'react'
// import * as BooksAPI from './BooksAPI'
import {Switch} from 'react-router'

import './App.css'
import {Route} from 'react-router-dom';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import NoMatch from './NoMatch'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/search" component={SearchPage}/>
                    <Route component={NoMatch}/> {/*invalid url error page*/}
                </Switch>
            </div>
        );
    }
}

export default BooksApp
