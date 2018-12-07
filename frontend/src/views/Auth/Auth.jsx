import React, { Component } from 'react';
import axios from 'axios';
import { fakeAuthCentralState } from '../../App';

import { 
    FormGroup, 
    Input, 
    Label, 
    Form, 
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    Row, 
    Col,
    Alert
} from 'reactstrap';

import Button from "../../components/CustomButton/CustomButton.jsx";


class Auth extends Component {
    state = {
        loginMode: true,
        redirectToReferrer: false,
        email: '',
        password: '',
        logged: '',
        nome: '',
        cpf: '',
        celular: '',
        end: '',
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    login(){
        localStorage.clear();
        //const { email, password } =  this.state
        if (this.state.email === '' || this.state.password === ''){
            alert('Preencha os campos corretamente!')
        }else {
            const email = this.state.email;
            const cpf = this.state.password;
            const password = this.state.password;

            const auctioneer = { email, password };

            const participant = { email, cpf}

            if(email !== 'test@test.com'){

                axios.post('http://localhost:3004/participant/login', participant)
                .then(response => {

                    const result = response.data.result;
                    const participant = response.data.participant;

                    if (participant){
                        localStorage.setItem('user',`${participant._id}`);
                        fakeAuthCentralState.authenticate(() => {      
                            this.setState(() => ({ redirectToReferrer: true }));
                        });
                    } 
                    else {
                        alert(result);
                    }
                }).catch((error) => alert("Desculpe! tente mais tarde"));
            } else {
                axios.post('http://localhost:3004/auctioneer/login', auctioneer)
                .then(response => {

                    const result = response.data.result;
                    const auctioneer = response.data.auctioneer;

                    if (auctioneer){
                        localStorage.setItem('admin','logged');
                        fakeAuthCentralState.authenticate(() => {      
                            this.setState(() => ({ redirectToReferrer: true }));
                        });
                    } 
                    else {
                        alert(result);
                    }
                }).catch((error) => alert("Desculpe! tente mais tarde"));
            }
        }
    }


    register(){
        if (this.state.email === '' || 
            this.state.cpf === '' || 
            this.state.celular === '' || 
            this.state.nome === '' || 
            this.state.endereco === '' 
        ){
            alert('Preencha os campos corretamente!')
        } else {
            const name = this.state.nome;
            const email = this.state.email;
            const cpf = this.state.cpf;
            const celular = this.state.celular;
            const endereco = this.state.end;

            const participant = {
                name,
                email,
                cpf,
                celular,
                endereco
            };

            console.log(participant);

            axios.post('http://localhost:3004/participant/register', participant)
                .then(response => {
                    console.log(response.data);
                    alert("sucess");
                    this.setState({ loginMode: true})
                })
                .catch((error) => { alert("Desculpe! Tente mais tarde!");
            });
        }
    }

    render(){
        const { loginMode } = this.state
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            this.props.history.push(from.pathname);
        }

        return(
            <div className="content-login">
                <div className="title-auth">
                    <h1>Sales&Buy</h1>
                    <h3>O melhor leilão com os melhores produtos!</h3>
                </div>
                <Row>    
                    <Col md={12}>   
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle>
                                    <div className="justify-content-center d-flex">
                                       {loginMode ? 'Login' : 'Criar Conta' } 
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                            <Form>
                                {loginMode ? 
                                    <div>
                                        <Row>
                                            <Col md={12} xs={12}>
                                                <FormGroup>
                                                    <Label>Email</Label>
                                                    <Input 
                                                        type="email" 
                                                        placeholder="Email"
                                                        value={this.state.email}
                                                        onChange={(event) => this.setState({ email: event.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} xs={12}>
                                                <FormGroup>
                                                    <Label>Senha</Label>
                                                    <Input 
                                                        type="password" 
                                                        placeholder="Senha"
                                                        value={this.state.password}
                                                        onChange={(event) => this.setState({ password: event.target.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row> 
                                    </div>:
                                    <div>
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
                                            <Label>Celular</Label>
                                            <Input 
                                                min="9"
                                                max="11"
                                                type="number" 
                                                placeholder="Celular" 
                                                value={this.state.celular}
                                                onChange={(event) => this.setState({celular: event.target.value})}
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
                                        <Col md={12}>
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
                                  </div>
                                }
                                <div className="update ml-auto mr-auto justify-content-center d-flex">
                                    {loginMode ? 
                                        <Button 
                                        color="success" 
                                        round
                                        onClick={() => this.login()}>Logar</Button>
                                        :
                                        <Button 
                                        color="success" 
                                        round
                                        onClick={() => this.register()}>Registrar</Button>
                                      }
                                </div>
                            </Form>
                                <p className="register text-center" onClick={() => this.changeMode()}>
                                    {loginMode ? 'Novo usuário? Registrar aqui!' :
                                        'Já é cadastrado? Entrar aqui!'}
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row> 
            </div>
        )
    }
}

export default Auth;