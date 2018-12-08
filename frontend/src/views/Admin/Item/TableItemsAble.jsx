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
        redictSuccessful: false
    };
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    changeTitle(event){
        this.setState({
            title: event.target.value
        })
    }

    changeValue(event){
        this.setState({
            value: event.target.value
        })
    }

    changeSalesman(event){
        this.setState({
            salesman: event.target.value
        })
    }

    changeDesc(event){
        this.setState({
            description: event.target.value
        })
    }
    
    saveItem(){
        const description = this.state.description;
        const title = this.state.title;
        const value = this.state.value;
        const salesman = this.state.salesman;
        const itemId = this.props.id;
        const isAble = true;
        const isAuction = true;

        const item = {
            description,
            title,
            value,
            salesman,
            itemId,
            isAble,
            isAuction,
        };

        axios.put(`http://localhost:3004/item/${itemId}`, item)
            .then(response => {
                alert("Alterado com sucesso!");
                console.log(response.data);
                this.setState({ redictSuccessful: true })
            })
    }
    
    deleteMarck(id){
        axios.delete(`http://localhost:3004/item/${id}`)
        .then(response => {
            alert("Excluido com sucesso!");
            this.setState({ redictSuccessful: true })
            
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
                    onClick={() => this.deleteMarck(this.props.id)}
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
                            placeholder="Nome do Item" 
                            value={this.state.title}
                            onChange={(event) => this.changeTitle(event)}
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
                            onChange={(event) => this.changeValue(event)}
                            placeholder="Valor" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup> 
                            <Label>Vendedor</Label>
                            <Input 
                                type="text"
                                placeholder="Vendedor"
                                value={this.state.salesman}
                                onChange={(event) => this.changeSalesman(event)}
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
                              value={this.state.description}
                              onChange={(event) => this.changeDesc(event)}
                              >
                            </Input>
                      </FormGroup>
                  </Col>
                </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.saveItem()}>salvar</Button>
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
