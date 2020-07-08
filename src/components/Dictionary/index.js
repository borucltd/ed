import React, { Component } from "react";
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import Worker from "../Worker";
// import Card from "./Card";
// import SearchForm from "./SearchForm";
// import MovieDetail from "./MovieDetail";
import API from "../../utils/API";
import "./style.css";

class Dictionary extends Component {

  // Setting the component's initial state
  state = {
    result: [],
    search: ""
  };

  // when component is mounted (once only) - in-built method
  componentDidMount() {
     this.searchPeople();
  }

  // custom method which runs API
  searchPeople = query => {
    
     API.search(query)
        .then(res => {console.log(res.data); this.setState({ result: res.data.results})})
        .catch(err => console.log(err));
  };



  render() {

    console.log("STATE:")
    console.log(this.state.result[0])
    return (
        <Container>
            <Row>
                <Col size="md-8">
                  {this.state.result.map(item => (
                    <Worker workerData={item}></Worker>
                  ))}
                </Col>
            </Row>
        </Container>
    )
  }
}

export default Dictionary;
