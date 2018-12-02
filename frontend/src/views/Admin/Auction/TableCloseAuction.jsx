import React, { Component } from "react";

class TableItemsUnale extends Component {
  render() {
    return (
        <tbody>
            <tr id={this.props.id}>
                <td>{this.props.title}</td>
                <td>{this.props.salesman}</td>
                <td>{this.props.participantName}</td>
                <td>{this.props.value}</td>
            </tr>
        </tbody>
    );
  }
}

export default TableItemsUnale;
