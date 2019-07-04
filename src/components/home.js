import React, { Component } from 'react';
import Image from "react-bootstrap/Image";

class Home extends Component {
    render() {
        return (
            <section className="home-content">
                <div className="home-text-body">
                    <p><br/></p>
                </div>
                <Image className="home-img" src="rickbg.png" fluid={true} />
            </section>
        )
    }
}
export default Home;