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
    allCharacters = [];
    pages = [];
    displayChar = [];
    constructor(props) {
        super(props);
        this.state = {
            searchKey: "",
            error: null,
            chars: []
        };
        this.changeSearch = this.changeSearch.bind(this);
        this.getResult = this.getResult.bind(this);
        this.checkName = this.checkName.bind(this);
    }

    componentDidMount() {
        this.pages = [];
        for(let i=1; i<= 20; i++){
            fetch("https://rickandmortyapi.com/api/character/?page="+i)
                .then(res => res.json())
                .then((result) => {
                        this.pages.push(i);
                        this.allCharacters = this.allCharacters.concat(result.results);
                        if(this.pages.length === 20){
                            this.getResult();
                        }
                        this.setState({
                            searchKey: "",
                            chars: result.results
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            searchKey: "",
                            error
                        });
                    }
                )
        }
    }

    checkName(params) {
        if(this.state.searchKey !== null){
            return params.name.includes(this.state.searchKey);
        }
        else{
            alert("is null");
        }
        return false;
    }

    getResult(){
        //alert("all char length " + this.allCharacters.length);
        //alert(this.state.searchKey);
        this.displayChar = [];
        if(this.state.searchKey === "" || this.state.searchKey === null){
            this.displayChar.push(
                this.allCharacters.map(char => (
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
        else{
            //alert("search term " + this.state.searchKey);
            let temp = this.allCharacters.filter(e => {
                let k = e.name.toLowerCase();
                return k.includes(this.state.searchKey);
            });
            
            this.displayChar.push(
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
        }
        //alert("Called size is " + this.displayChar.length);
    }

    nothing(event){
        //alert("called");
    }

    changeSearch(event){
        let k = event.target.value.toLowerCase();
        this.setState({searchKey: k})
        //alert(event.target.value);
        this.getResult();
    }

    render()
    {
        const { error, searchKey } = this.state;
        if (error) {
            //alert("error");
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
                                <input type="text" hint="Search" placeholder="Search" onKeyDown={this.changeSearch} onChange={this.changeSearch}/>
                            </form>
                        </Row>
                        <Row className="char-row">
                            {this.displayChar}
                        </Row>
                    </Container>
                </section>
            );
        }
    }
}
export default Characters;