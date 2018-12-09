import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
        redictSuccessful: false
    };
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }
    
    initAuction(){
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
            itemId,
            isOpen: true
        };

        const title = this.state.title;
        const description = this.state.description;
        const isAble = true;
        const isAuction = false;
    
        const item = {
            value,
            salesman,
            title,
            description,
            isAuction,
            isAble
        };
      
        axios.post(`http://localhost:3004/auction/register/`, auction)
            .then(response => {
                console.log(response.data);
            })
        axios.put(`http://localhost:3004/item/${itemId}`, item)
            .then(response => {
                alert("Leilão Iniciado!");
                console.log(response.data);
                this.setState({ redictSuccessful: true })
            })
    }
    
  render() {
    return (
        <tbody>
            <tr  onClick={this.props.clicked} id={this.state.itemId}>
                <td>{this.state.title}</td>
                <td>{this.state.salesman}</td>
                <td>{this.state.value}</td>
                <td><Button 
                    round 
                    onClick={() => this.toggle()}
                    color="warning">
                        <i className="nc-icon nc-alert-circle-i"/>
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
            <Button color="primary" onClick={() => this.initAuction()}>Iniciar Leilão</Button>
            <Button color="secondary" onClick={() => this.toggle()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        { this.state.redictSuccessful === true && (
            <Redirect to="/admin" />
        )}
        </tbody>
    );
  }
}

export default TableItemsAble;
