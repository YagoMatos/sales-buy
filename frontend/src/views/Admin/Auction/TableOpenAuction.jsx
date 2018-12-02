import React, { Component } from "react";
import axios from 'axios';

import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form,
    FormGroup,
    Label,
    ModalFooter,
    Input,
    Row,
    Col
} from "reactstrap";

import Button from "../../../components/CustomButton/CustomButton.jsx";

class TableItemsAble extends Component {
    state = {
        modal: false,
        title: this.props.title,
        value: this.props.value,
        salesman: this.props.salesman,
        description: this.props.description,
        id: this.props.id,
    };
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }
    
    editAuction(){
        const itemDescription = this.state.description;
        const itemName = this.state.title;
        const value = this.state.value;
        const salesman = this.state.salesman;
        const itemId = this.state.id;
        console.log(itemId);

        const auction = {
            itemDescription,
            itemName,
            value,
            salesman,
            itemId
        };

        axios.put(`http://localhost:3004/auction/${auction}`, auction)
            .then(response => {
                alert("sucess");
                window.location = "auction"
                console.log(response.data);
        })
    }
    
    deleteAuction(idAuct){
        console.log(id)
        const value = this.state.value;
        const salesman = this.state.salesman;
        const itemId = this.state.id;
        const title = this.state.title;
        const description = this.state.description;
        const isAble = true;
        const isAuction = true;
        const id = this.props.idItem;
    
        const item = {
            value,
            salesman,
            title,
            description,
            isAuction,
            isAble,
        };

        console.log(item);

        axios.delete(`http://localhost:3004/auction/${idAuct}`)
        .then(response => {
            console.log(response.data);
        })
        axios.put(`http://localhost:3004/item/${id}`, item)
        .then(response => {
            alert("sucess");
            //window.location = "auction"
            console.log(response.data);
        })
    }

  render() {
    return (
        <tbody>
            <tr  onClick={this.props.clicked} id={this.props.id}>
                <td>{this.props.title}</td>
                <td>{this.props.salesman}</td>
                <td>{this.props.value}</td>
                <td><Button 
                    round 
                    onClick={() => this.toggle()}
                    color="warning">
                        <i className="nc-icon nc-alert-circle-i"/>
                    </Button>
                </td>
                <td><Button 
                    round 
                    onClick={() => this.deleteAuction(this.props.id)}
                    color="danger">
                        <i className="nc-icon nc-simple-remove"/>
                    </Button>
                </td>

            </tr>
  
            <Modal isOpen={this.state.modal} toggle={() => this.toggle()} className={this.props.className}>
          <ModalHeader toggle={() => this.toggle()}>
            Informção do Item {this.props.title}
        </ModalHeader>
          <ModalBody>
            <Form>
                 <Row>
                    <Col md={12} xs={12}>
                      <FormGroup> 
                          <Label>Nome do Item</Label>
                          <Input 
                            type="text" 
                            disabled
                            placeholder="Nome do Item" 
                            value={this.state.title}
                          />
                        </FormGroup>
                      </Col>
                </Row>
                <Row>
                <Col md={6} xs={12}>
                    <FormGroup> 
                        <Label>Valor</Label>
                        <Input 
                            type="number" 
                            name="value" 
                            value={this.state.value}
                            disabled
                            placeholder="Valor" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup> 
                            <Label>Vendedor</Label>
                            <Input 
                                type="text"
                                placeholder="Vendedor"
                                disabled
                                value={this.state.salesman}
                                >
                            </Input>
                        </FormGroup>
                      </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup> 
                        <Label>Descrição</Label>
                          <Input 
                              type="textarea"
                              placeholder="Descrição"
                              disabled
                              value={this.state.description}
                              >
                            </Input>
                      </FormGroup>
                  </Col>
                </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editAuction()}>Fechar Leilão</Button>
            <Button color="secondary" onClick={() => this.toggle()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        </tbody>
    );
  }
}

export default TableItemsAble;
