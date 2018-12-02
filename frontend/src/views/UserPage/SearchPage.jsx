import React, { Component } from "react";
import axios from "axios"; 

import { Form, Card, CardBody, FormGroup, Input, Row, Col } from "reactstrap";
import Button from "../../components/CustomButton/CustomButton.jsx";
import CardPatient from "../../components/CardPatient/CardPatent";

class SearchPage extends Component {
  constructor () {
    super()
    this.state = {
      nome: '',
      error:'',
      patients: []
    }
  }

  searchPatient(){
    const name = this.state.nome
    axios.get(`http://localhost:3003/patient/search/${name}`)
    .then(response => {
      const patients = response.data;
      this.setState({ patients: patients.patient });

      console.log(patients.patient);
    })
  }

  patientClicked(id){
    console.log(id)
  }

  render(){
    return (
      <div className="content">
        <Row>
          <Col md={12}>
            <h3 className="text-center">Encontre seu Paciente</h3>
            <Card>
              <CardBody>
                <Form>
                  <Row>
                    <Col>
                      <FormGroup> 
                        <Input 
                          type="text" 
                          placeholder="Buscar Paciente..." 
                          value={this.state.nome}
                          onChange={(event) => this.setState({nome: event.target.value})}
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <div className="update ml-auto mr-auto">
                      <Button 
                        color="success" 
                        round
                        onClick={() => this.searchPatient()}>
                        Buscar
                      </Button>
                    </div>
                  </Row>
                </Form>
                </CardBody>
              </Card>
          </Col>
        </Row>
        <Row>
          { this.state.patients.map(p => {
            return (
              <Col md={6}>
              <CardPatient
                key={p._id} 
                name={p.name}
                email={p.email}
                id={p._id}
                clicked={() => this.patientClicked(p._id)}
              />
              </Col>
            )
          })}
        </Row>
      </div>
    );
  }
}

export default SearchPage;
