import React, { Component } from "react";
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import Header from "../Header";
import Worker from "../Worker";
import Table from 'react-bootstrap/Table';
import API from "../../utils/API";
import "./style.css";


class Dictionary extends Component {

  // Setting the component's initial state
  state = {
    result: [],
    initial: []
  };

  // when component is mounted (once only)
  componentDidMount() {
     this.searchPeople();
  }

  // custom method which runs API
  searchPeople = query => {
     API.search(query)
        .then(res => {console.log(res.data); this.setState({ 
          result: res.data.results,
          initial: res.data.results
        })})
        .catch(err => console.log(err));
  };

  // compare function
  compare = (a,b,parameter) => {
    if (parameter) {
      const properties = parameter.split(".");  
      switch (properties.length) {
        case 1:
          a = a[properties[0]];
          b = b[properties[0]];
          break;
        case 2:
          a = a[properties[0]][properties[1]];
          b = b[properties[0]][properties[1]];
          break;
        case 3:
          a = a[properties[0]][properties[1]][properties[2]];
          b = b[properties[0]][properties[1]][properties[2]];
          break;
        default:
          a = a[properties[0]];
          b = b[properties[0]];
          break;
      }

      if (a < b ) {
        return -1;
      } else if ( b < a ){
        return 1;
      } else {
        return 0;
      }
    } else {
      console.log(a)
      return a - b;
    } 

    
  }

  sortRecords = (column) => {
    console.log("Sorting..." + column)
    // here the sorting will be different for different columns
    switch(column) {
      case "age":
        this.setState({result: this.state.result.sort((x,y) => {return this.compare(x,y,"dob.age")})})  
        break;

      case "first":
        this.setState({result: this.state.result.sort((x,y) => {return this.compare(x,y,"name.first")})})       
        break;

      case "last":
        this.setState({result: this.state.result.sort((x,y) => {return this.compare(x,y,"name.last")})})   
        break;

      case "mobile":
        this.setState({result: this.state.result.sort((x,y) => {return this.compare(x,y,"phone")})})   
        break;

      case "country":
        this.setState({result: this.state.result.sort((x,y) => {return this.compare(x,y,"location.country")})}) 
        break;

      default:
        console.log("Noting.");
        break;
    }
  }

  // sort handler
  handleSort = event => {
    event.preventDefault();
    this.sortRecords(event.target.name);
  }

  // filter handler
  handleInputChange = event => {
    console.log(this.state.initial)
    
    event.preventDefault();
    // getting the value which triggered the change
    const reg  = `^${event.target.value}.*`;
    console.log("Filtering..." + reg)
    // filter per first name
    const filtered =  this.state.initial.filter(function(record){
      return record.name.first.match(reg);
    })
    console.log(filtered.length);
    if (filtered.length !== 0) {
      this.setState({
        result: filtered
      })
    } else {
      this.setState({
        result: this.state.initial
      })
    }       
  }

  render() {
    return (
        <Container>   
          <Row fluid> 
            <Col>
                  <Header handleInputChange={this.handleInputChange}/>

                  <Table striped bordered hover variant="dark">
                      <thead>
                          <tr>
                          <th>Photo</th>
                          <th><button onClick={this.handleSort} name="age">Age</button></th>
                          <th><button onClick={this.handleSort} name="first">First Name</button></th>
                          <th><button onClick={this.handleSort} name="last">Last Name</button></th>
                          <th><button onClick={this.handleSort} name="mobile">Mobile</button></th>
                          <th><button onClick={this.handleSort} name="country">Country</button></th>
                          </tr>
                      </thead>
                      <tbody>
                         {this.state.result.map((item,id) => (
                            <Worker key={id} workerData={item}></Worker>
                          ))}
                      </tbody>    
                  </Table>
              </Col> 
            </Row>   
        </Container>
    )
  }
}

export default Dictionary;
