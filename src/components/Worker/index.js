import React from "react";
import "./style.css";

function Worker(props) {
  return (
        <tr>
            <td><img src={props.workerData.picture.thumbnail} alt="face"></img></td>
            <td>{props.workerData.dob.age}</td>
            <td>{props.workerData.name.first}</td>
            <td>{props.workerData.name.last} </td>
            <td>{props.workerData.cell}</td>
            <td>{props.workerData.location.country} </td>
        </tr>
  )
}

export default Worker;
