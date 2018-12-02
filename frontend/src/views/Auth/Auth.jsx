import React, { Component } from 'react';
import axios from 'axios';


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

  import { Route, Redirect } from "react-router-dom";
import Dashboard from '../../layouts/Dashboard/Dashboard';


class Auth extends Component {
    state = {
        email: '',
        password: '',
    }

    handleEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    handlePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    login(){
        const email = this.state.email;
        const password = this.state.password;

        const auctioneer = {
            email,
            password,
        };

        console.log(auctioneer);

        axios.post('http://localhost:3004/auctioneer/login', auctioneer)
            .then(response => {
                console.log(response);
                const result = response.data.result;
                const auctioneer = response.data.auctioneer;
                if (auctioneer){
                    alert('sucesso');
                } 
                else {
                    alert(result);
                }

            }).catch((error) => alert("Sorry"));
    }
    
    render(){
        return(
            <div className="content-login">
                <Row>
                   
                    <Col md={12}>
                        <div className="title-auth">
                            <h1>SalesAndBuy</h1>
                        </div>
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle>
                                    <div className="justify-content-center d-flex">
                                        Login Admin
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