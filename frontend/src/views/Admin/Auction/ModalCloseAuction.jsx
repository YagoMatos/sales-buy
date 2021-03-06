import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Row,
    Col,
    Form,
    Input,
    FormGroup,
    Label
} from 'reactstrap';

import Button from "../../../components/CustomButton/CustomButton.jsx";

class ModalSchedule extends Component {

  state = {
    modal: false,
    title: this.props.title,
    value: this.props.value,
    salesman: this.props.salesman,
    description: this.props.description,
    id: this.props.id,
    password: '',
    redictSuccessful: false
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  closeAuction(){
    console.log(this.props.participantName )
    if( this.props.participantName === undefined || this.props.participantName === '' ){
      alert('Não é possivel fechar o Lelão no momento!')
    } else {
      const auctioneer = {
        password: this.state.password,
        email: "test@test.com"
    };

    axios.post('http://localhost:3004/auctioneer/login', auctioneer)
      .then(response => {
          console.log(response);

          const auctioneer = response.data.auctioneer;
          
          if (auctioneer){
              alert('Leilão Fechado com Sucesso!');
              const itemDescription = this.state.description;
              const itemName = this.state.title;
              const value = this.state.value;
              const salesman = this.state.salesman;
              const itemId = this.props.idItem;
              const isOpen = false;
              const closeAt = Date.now();
              const participantName = this.props.participantName;
              const participantId = this.props.participantId
          
              const title = this.state.title;
              const description = this.state.description;
              const isAble = false;
              const isAuction = false;
              const auctionId = this.props.auctionId;
          
              const item = {
                  value,
                  salesman,
                  title,
                  description,
                  isAuction,
                  isAble,
                  participantId
              };
          
              const auction = {
                  itemDescription,
                  itemName,
                  value,
                  salesman,
                  itemId,
                  isOpen,
                  closeAt,
                  participantId,
                  participantName,
              };
          
              console.log(item);
          
              axios.put(`http://localhost:3004/auction/${auctionId}`, auction)
              .then(response => {
                  console.log(response.data);
              })
          
              axios.put(`http://localhost:3004/item/${itemId}`, item)
              .then(response => {
                  console.log(response.data);
                  this.setState({ redictSuccessful: true })
              }) 
          }
          else{
            alert('Senha inválida')
          }
      }).catch((error) => alert("Desculpe tente mais tarde"));
    }
 }

  render() {
    return (
      <div>
       <Button 
            round 
            onClick={() => this.toggle()}
            color="danger">
            <i className="nc-icon nc-simple-remove"/>
        </Button>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()} className={this.props.className}>
          <ModalHeader toggle={() => this.toggle()}>
             Fechar Leilão
        </ModalHeader>
          <ModalBody>
            <Form>
                 <Row>
                    <Col md={12} xs={12}>
                      <FormGroup> 
                          <Label>Senha do Administrador</Label>
                          <Input 
                            type="password" 
                            value={this.state.password}
                            onChange={(event) => this.setState({ password: event.target.value })}
                          />
                        </FormGroup>
                      </Col>
                </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.closeAuction()}>Fechar Leilão</Button>
            <Button color="secondary" onClick={() => this.toggle()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        { this.state.redictSuccessful === true && (
            <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default ModalSchedule;