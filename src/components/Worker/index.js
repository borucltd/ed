import React from "react";
import Table from 'react-bootstrap/Table';

function Worker(props) {

    console.log(props)
  return (
    <Table striped bordered hover>
    <tbody>
        <tr>
            <td><img src={props.workerData.picture.thumbnail} alt="photo"></img></td>
            <td>{props.workerData.dob.age}</td>
            <td>{props.workerData.name.first}</td>
            <td>{props.workerData.name.last} </td>
            <td>{props.workerData.cell}</td>
            <td>{props.workerData.location.country} </td>
        </tr>
    </tbody>
    </Table>
  )

}

export default Worker;
