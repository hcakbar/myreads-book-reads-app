import React from 'react'

class NoMatch extends React.Component {
    render() {
        return (
            <div align="center">
                <div className="book-cover" style={{
                    width: 360,
                    height: 480,
                    //Image from https://cdn.shopify.com/s/files/1/0070/7032/files/05_404_kitten_large.jpg
                    backgroundImage: `url("https://cdn.shopify.com/s/files/1/0070/7032/files/05_404_kitten_large.jpg")`
                }}></div>
                <div>
                    <p>Invalid URL Please try: <i>&lt;host:port&gt;/</i> OR <i>&lt;host:port&gt;/search</i></p>
                </div>
            </div>
        )
    }
}

export default NoMatch;
