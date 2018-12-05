import React, { Component } from 'react';
import axios from 'axios';
import { fakeAuthCentralState } from '../../App';

import { 
    FormGroup, 
    Input, 
    Label, 
    Form, 
    Card, 
    CardHeader, 
    CardBody, 
    CardTitle, 
    Row, 
    Col 
} from 'reactstrap';

import Button from "../../components/CustomButton/CustomButton.jsx";

class Auth extends Component {
    state = {
        redirectToReferrer: false,
        email: '',
        password: '',
        logged: ''
    }

    handleEmail(e){
        this.setState({email: e.target.value})
    }

    handlePassword(e){
        this.setState({password: e.target.value})
    }

    login(){
        localStorage.clear();
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
    
    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            this.props.history.push(from.pathname);
        }

        return(
            <div className="content-login">
                <Row>
                    <Col md={12}>
                        <div className="title-auth">
                            <h1>Sales&Buy</h1>
                        </div>
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle>
                                    <div className="justify-content-center d-flex">
                                        Login
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col md={12} xs={12}>
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
                                        <Col md={12} xs={12}>
                                            <FormGroup>
                                                <Label>Senha</Label>
                                                <Input 
                                                    type="password" 
                                                    placeholder="Senha"
                                                    value={this.state.password}
                                                    onChange={(event) => this.setState({password: event.target.value})}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <div className="update ml-auto mr-auto justify-content-center d-flex">
                                        <Button 
                                            color="success" 
                                            round
                                            onClick={() => this.login()}
                                        >Logar</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row> 
            </div>
        )
    }
}

export default Auth;