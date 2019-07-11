import React, { Component } from 'react';
import Container from "react-bootstrap/es/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { fork } from 'child_process';

class Characters extends Component {
    allCharacters=[];
    pages = [];
    constructor(props) {
        super(props);
        this.state = {
            searchKey: "",
            error: null,
            isLoaded: false,
            chars: []
        };
        this.changeSearch = this.changeSearch.bind(this);
    }

    componentDidMount() {
        if(this.state.searchKey === ""){ 
            this.pages = [];
            for(let i=1; i<= 20;i++){
                fetch("https://rickandmortyapi.com/api/character/?page="+i)
                    .then(res => res.json())
                    .then((result) => {
                            this.pages.push(i);
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
                    ).then(()=>{
                        this.populate(this.state.chars);
                    })
            }
        }
        else{
            let temp = this.state.chars.filter( char => char.name.includes("rick"));
            this.populate(temp);
        }

       

    }



    populate(chars){
        if(this.state.searchKey !== ""){
            this.allCharacters = [];
        }
        this.allCharacters.push(
            chars.map(char => (
                    <span>
                    <Card className="char-card">
                        <Card.Header>{char.name}</Card.Header>
                        <Card.Img variant="top" src={char.image}/>
                        <Card.Body>
                                <ListGroup>
                                  <ListGroup.Item className="char-list-item">
                                      Status: {char.status}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Species: {char.species}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Type: {char.type}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Gender: {char.gender}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Origin: {char.origin.name}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Location: {char.location.name}
                                  </ListGroup.Item>
                                </ListGroup>
                        </Card.Body>
                    </Card>
                    </span>
                ))
        );
    }

    getResult(){
        if(this.state.searchKey === ""){
            return this.allCharacters;
        }
        else{
            let temp = this.state.chars.filter( char => char.name.includes(this.state.searchKey));
            let result = [];
            result.push(
                temp.map(char => (
                    <span>
                    <Card className="char-card">
                        <Card.Header>{char.name}</Card.Header>
                        <Card.Img variant="top" src={char.image}/>
                        <Card.Body>
                                <ListGroup>
                                  <ListGroup.Item className="char-list-item">
                                      Status: {char.status}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Species: {char.species}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Type: {char.type}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Gender: {char.gender}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Origin: {char.origin.name}
                                  </ListGroup.Item>
                                  <ListGroup.Item className="char-list-item">
                                      Location: {char.location.name}
                                  </ListGroup.Item>
                                </ListGroup>
                        </Card.Body>
                    </Card>
                    </span>
                ))
            );
            return result;
        }
    }

changeSearch(event){
    this.setState({searchKey: event.target.value})
}

    render()/* {
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
        const { error, searchKey } = this.state;
        if (error) {
            alert("error");
            return <div>Error: {error.message}</div>;
        } else if ( this.pages.length < 20 ) {
            return (
                <Container className="char-loading">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                </Container>
            );
        } else {
            return (
                <section className="characters-content">
                    <Container className="char-container">
                        <Row>
                            <form className="search-bar" id="searchBar">
                                <input type="text" hint="Search" value={this.state.searchKey} placeholder="Search" onChange={this.changeSearch}/>
                            </form>
                        </Row>
                        <Row className="char-row">
                            {this.allCharacters}
                        </Row>
                    </Container>
                </section>
            );
        }
    }
}
export default Characters;