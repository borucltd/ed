import React, { Component } from "react";
import Container from "../Container";
//import Row from "../Row";
//import Col from "../Col";
import Worker from "../Worker";
import Table from 'react-bootstrap/Table';
import API from "../../utils/API";
import "./style.css";

class Dictionary extends Component {

  // Setting the component's initial state
  state = {
    result: [],
    sort: "",
    filter: ""
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

  // sort Records
  sortRecords = (column) => {
    console.log("Sorting..." + column)
    // here the sorting will be different for different columns

    switch(column) {
      case "age":
        this.setState({
          result: this.state.result.sort(function(a, b){return a.dob.age - b.dob.age})
        })
        break;

      case "first":
        this.setState({
          result: this.state.result.sort(function(a, b){
            let x = a.name.first.toLowerCase();
            let y = b.name.first.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          })});
        
        break;

      case "last":
        this.setState({
          result: this.state.result.sort(function(a, b){
            let x = a.name.last.toLowerCase();
            let y = b.name.last.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;           
          })});
        break;

      case "mobile":
        this.setState({
          result: this.state.result.sort(function(a, b){
            let x = a.phone.split("");
            let y = b.phone.split("");
            if (x.length < y.length) {return -1;}
            if (x.length > y.length) {return 1;}
            return 0;
            })});
        break;

      case "country":
        this.setState({
          result: this.state.result.sort(function(a, b){
            let x = a.location.country.toLowerCase();
            let y = b.location.country.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          })});
        break;

      default:
        break;
    }
    
    console.log(this.state.result);




  }

   // filter Records
   filterRecords = query => {
   
  }
  

  // sort
  handleSort = event => {
    event.preventDefault();
    this.sortRecords(event.target.name);

  }

  // filter
  handleFilter = event => {
    event.preventDefault();
    this.filterRecords(this.state.filter);
  }

  wyswietl = () => {
    console.log("HOVER");
  }

  render() {
    return (
        <Container>               
                  <h1>Employee directory</h1>
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
              
        </Container>
    )
  }
}

export default Dictionary;
