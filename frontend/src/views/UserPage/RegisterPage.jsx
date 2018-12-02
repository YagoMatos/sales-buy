import React, { Component } from "react";
import axios from "axios"; 

import { 
  FormGroup, 
  Input, 
  Label, 
  Form, 
  Alert,
  Card, 
  CardHeader, 
  CardBody, 
  CardTitle, 
  Row, 
  Col 
} from 'reactstrap';
import Button from "../../components/CustomButton/CustomButton.jsx";

class RegisterPage extends Component {
  constructor () {
    super()
    this.state = {
      nome: '',
      email: '',
      cpf: '',
      tel: '',
      rg: '',
      end: '',
    }
  }
  
  registerPatient(){
    const name = this.state.nome;
    const email = this.state.email;
    const cpf = this.state.cpf;
    const rg = this.state.rg;
    const telefone = this.state.tel;
    const endereco = this.state.end;

    const patient = {
      name,
      email,
      cpf,
      telefone,
      rg,
      endereco
  };

  console.log(patient);

  axios.post('http://localhost:3003/patient/register', patient)
      .then(response => {
        console.log(response.data);
          alert("sucess");
          window.location = "/"
      })
      .catch((error) => {
        alert("Sorry");
    });
      
  }

  render(){
    return (
      <div className="content">
          <Col md={12} xs={12}>
            <Card className="card-user">
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6} xs={12}>
                      <FormGroup> 
                          <Label>Nome</Label>
                          <Input 
                            type="text" 
                            placeholder="Nome" 
                            value={this.state.nome}
                            onChange={(event) => this.setState({nome: event.target.value})}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6} xs={12}>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input 
                            type="email" 
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(event) => this.setState({email: event.target.value})}
                          />
                        </FormGroup>
                      </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                          <Label>RG</Label>
                          <Input 
                            min="9"
                            max="9"
                            type="number" 
                            placeholder="RG" 
                            value={this.state.rg}
                            onChange={(event) => this.setState({rg: event.target.value})}
                          />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                          <Label>CPF</Label>
                          <Input 
                            min="11"
                            max="11"
                            type="number" 
                            placeholder="CPF" 
                            value={this.state.cpf}
                            onChange={(event) => this.setState({cpf: event.target.value})}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                          <Label>Telefone</Label>
                          <Input 
                            required
                            min="8"
                            max="8"
                            type="number" 
                            placeholder="telefone" 
                            value={this.state.tel}
                            onChange={(event) => this.setState({tel: event.target.value})}
                          />
                      </FormGroup>
                    </Col>
                    <Col md={8}>
                      <FormGroup>
                          <Label>Endereço</Label>
                          <Input 
                            required
                            type="text" 
                            placeholder="endereço" 
                            value={this.state.end}
                            onChange={(event) => this.setState({end: event.target.value})}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button 
                        color="success" 
                        round
                        onClick={() => this.registerPatient()}
                      >Salvar</Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
      </div>
    );
  }
}

export default RegisterPage;
