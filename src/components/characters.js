import React, { Component } from 'react';
import Container from "react-bootstrap/es/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class Characters extends Component {
    items =[];
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            chars: []
        };
    }

    componentDidMount() {
        fetch("https://rickandmortyapi.com/api/character/")
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        chars: result.results
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }



    populate(){
        for (let number = 1; number <= 25; number++) {
            this.items.push(
                <span>
                    <Card className="char-card">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </span>
            );
        }
        return this.items;
    }

    render() /*{
        return (
            <section className="characters-content">
                <Container className="char-container">
                    <Row className="char-row">
                        {this.populate()}
                    </Row>

                </Container>
            </section>

        )
    }*/
    {
        const { error, isLoaded, chars } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {chars.map(char => (
                        <li key={char.name}>
                            {char.name} {char.price}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}
export default Characters;