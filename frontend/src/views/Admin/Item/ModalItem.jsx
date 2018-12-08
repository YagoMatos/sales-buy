import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { 
    Button, 
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

class ModalSchedule extends React.Component {

  state = {
    modal: false,
    title: '',
    value: '',
    salesman: '',
    description: ''
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  save(){
    const title = this.state.title;
    const value = this.state.value;
    const salesman = this.state.salesman;
    const description = this.state.description;
    const isAble = true;
    const isAuction = true;

    const item = {
        value,
        salesman,
        title,
        description,
        isAuction,
        isAble
    };
  
    console.log(item);
  
    axios.post('http://localhost:3004/item/register', item)
        .then(response => {
            alert("sucess");
            return (<Redirect to={{ pathname: '/item'}} />)
        })
        .catch((error) => {
          alert("Item Já cadastrado!");
      });
        
    }

  render() {
    return (
      <div>
        <Button color="success" onClick={() => this.toggle()}>
            Cadastrar novo Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()} className={this.props.className}>
          <ModalHeader toggle={() => this.toggle()}>
            Novo Item
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
                            onChange={(event) => this.setState({ title: event.target.value })}
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
                            onChange={(event) => this.setState({ value: event.target.value })}
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
                                onChange={(event) => this.setState({ salesman: event.target.value })}
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
                              onChange={(event) => this.setState({ description: event.target.value })}
                            >
                            </Input>
                      </FormGroup>
                  </Col>
                </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.save()}>Salvar</Button>
            <Button color="secondary" onClick={() => this.toggle()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalSchedule;