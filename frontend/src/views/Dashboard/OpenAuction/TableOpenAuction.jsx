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
        participantId: this.props.participantId,
        participantName: '',
        title: this.props.title,
        value: this.props.value,
        salesman: this.props.salesman,
        description: this.props.description,
        idItem: this.props.idItem,
        id: this.props.id,
        valueParticipant: '',
    };

    componentDidMount(){
        const participantId = localStorage.getItem('user');

        axios.get(`http://localhost:3004/participant/${participantId}`)
        .then(response => {
            const participant = response.data
            this.setState({ participantName: participant.participant.name });
            console.log(participant.participant.name);
        });

    }
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    changeValue(event){
        this.setState({
            valueParticipant: event.target.value
        })
    }
    
    bid(){
        if(this.state.valueParticipant <= this.state.value || this.state.valueParticipant === ''){
            alert('Valor inválido, insira uma valor maior!');
        } else {

            const itemDescription = this.state.description;
            const itemName = this.state.title;
            const value = this.state.valueParticipant;
            const salesman = this.state.salesman;
            const itemId = this.state.idItem;
            const participantId = localStorage.getItem('user');
            const participantName = this.state.participantName;
            const auctionId = this.state.id;

            console.log(itemId);

            const auction = {
                itemDescription,
                itemName,
                value,
                salesman,
                itemId,
                participantName,
                participantId,
                isOpen: true,
            };

            axios.put(`http://localhost:3004/auction/${auctionId}`, auction)
                .then(response => {
                    alert("sucess");
                    //window.location = "auction"
                    console.log(response.data);
            }).catch(error => console.log(error))
        }
        
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
                <Row>
                    <Col md={6} xs={12}>
                        <FormGroup> 
                            <Label>Seu Valor</Label>
                            <Input 
                                type="number" 
                                name="value" 
                                value={this.state.valueParticipant}
                                placeholder="Valor" 
                                onChange={(event) => this.changeValue(event)}
                                />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup> 
                                <Label>Nome Participante</Label>
                                <Input 
                                    type="text"
                                    disabled
                                    value={this.state.participantName}
                                    >
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.bid()}>Dar Lance</Button>
            <Button color="secondary" onClick={() => this.toggle()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        </tbody>
    );
  }
}

export default TableItemsAble;
