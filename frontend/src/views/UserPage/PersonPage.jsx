import React, { Component } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";

import CardAuthor from "../../components/CardElements/CardAuthor.jsx";
import Report from "../Report/Report.jsx";
import { 
  FormGroup, 
  Input, 
  Label, 
  Form, 
  Card, 
  CardHeader, 
  CardBody, 
  CardTitle,
  CardFooter,
  Row, 
  Col 
} from 'reactstrap';

import Button from "../../components/CustomButton/CustomButton.jsx";
import damirBosnjak from "../../assets/img/damir-bosnjak.jpg";
import mike from "../../assets/img/mike.jpg";

class PersonPage extends Component {
  constructor () {
    super()
    this.state = {
      patientName: '',
      patientCpf: '',
      patientEmail: '',
      patientId: '',
      patientEnable: '',
      patientEnd: '',
      patientRg: '',
      patientTel: '',
      reports: '',
      patient: {
        name: '',
        cpf: '',
        rg: '',
        enable: '',
        email: '',
        telefone: '',
        endereco: '',
        _id: '',
    }
  }
}

  handleChangeName(event) {
    this.setState({
      patientName: event.target.value
    })
  }

  handleChangeEnable(event) {
    this.setState({
      patientEnable: event.target.value
    })
  }

  handleChangeRg(event) {
      this.setState({
        patientRg: event.target.value
    })
  }

  handleChangeCpf(event) {
    this.setState({
      patientCpf: event.target.value
    })
  }

  handleChangeEmail(event) {
    this.setState({
      patientEmail: event.target.value
    })
  }

  handleChangeTel(event) {
    this.setState({
      patientTel: event.target.value
    })
  }

  handleChangeEnd(event) {
    this.setState({
      patientEnd: event.target.value
    })
  }

  componentDidMount(){
    // console.log(this.props.location.pathname)
    const patientId = this.props.location.pathname;
    axios.get(`http://localhost:3003${patientId}`)
    .then(response => {
        console.log(response.data);
        const patient = response.data;
        this.setState({ patient: patient.patient });
        this.setState({
          patientName: patient.patient.name,
          patientCpf: patient.patient.cpf,
          patientEmail: patient.patient.email,
          patientId: patient.patient._id,
          patientEnable: patient.patient.enable,
          patientRg: patient.patient.rg,
          patientTel: patient.patient.telefone,
          patientEnd: patient.patient.endereco,
        });
        this.renderReports(patient.patient._id);
    });
  }

  renderReports(patientId){
    axios.get(`http://localhost:3003/report/${patientId}`)
    .then(response => {
        console.log(response.data);
          const report = response.data
          this.setState({ reports: report });
          console.log(this.state.reports);
      });
  }

  reports(){
    return(
      <Report patientIdReport={this.state.patientId} report={this.state.reports}/>
    );
  }

  registerPatient(){
    const name = this.state.patientName;
    const email = this.state.patientEmail;
    const rg = this.state.patientRg;
    const cpf = this.state.patientCpf;
    const patientId = this.state.patient._id;
    const enable = this.state.patientEnable;
    const endereco = this.state.patientEnd;
    const telefone = this.state.patientTel;

    const patient = {
      name,
      cpf,
      rg,
      enable,
      email,
      endereco,
      telefone,
      patientId,
  };

  console.log(patientId);

  axios.put(`http://localhost:3003/patient/${patientId}`, patient)
      .then(response => {
          alert("sucess");
          window.location=`${patientId}`
          console.log(response.data);
        })
  }
  
  render(){
    const { name, enable, email } = this.state.patient;

    return (
      <div className="content">
        <Row>
          <Col md={4} xs={12}>
            <Card className="card-user">
              <div className="image">
                <img src={damirBosnjak} alt="..." />
              </div>
              <CardBody>
                <CardAuthor
                  avatar={mike}
                  avatarAlt="..."
                  title={name} 
                  description={email}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={8} xs={12}>
            <Card className="card-user">
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardBody>
              <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup> 
                          <Label>Nome</Label>
                          <Input 
                            type="text" 
                            placeholder="Nome" 
                            value={this.state.patientName}
                            required
                            onChange={(event) => this.handleChangeName(event)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input 
                            type="text" 
                            required
                            placeholder="Email" 
                            value={this.state.patientEmail}
                            onChange={(event) => this.handleChangeEmail(event)}
                          />
                        </FormGroup>
                      </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                          <Label>RG</Label>
                          <Input 
                            required
                            type="number" 
                            placeholder="RG" 
                            value={this.state.patientRg}
                            onChange={(event) => this.handleChangeRg(event)}
                          />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                          <Label>CPF</Label>
                          <Input 
                            required
                            type="number" 
                            placeholder="CPF" 
                            value={this.state.patientCpf}
                            onChange={(event) => this.handleChangeCpf(event)}
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
                            type="number" 
                            placeholder="telefone" 
                            value={this.state.patientTel}
                            onChange={(event) => this.handleChangeTel(event)}
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
                            value={this.state.patientEnd}
                            onChange={(event) => this.handleChangeEnd(event)}
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
                      <div className="update ml-auto mr-auto">
                        <Link to="/" >
                          <Button color="danger" round>
                            Cancelar
                          </Button>
                        </Link>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {
              this.reports()
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default PersonPage;
