import React, { Component } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";

import CardAuthor from "../../../components/CardElements/CardAuthor.jsx";
import Report from "./Report.jsx";
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

import Button from "../../../components/CustomButton/CustomButton.jsx";
import damirBosnjak from "../../../assets/img/damir-bosnjak.jpg";
import mike from "../../../assets/img/mike.jpg";

class PersonPage extends Component {
  constructor () {
    super()
    this.state = {
      participantName: '',
      participantCpf: '',
      participantEmail: '',
      participantId: '',
      participantEnable: '',
      participantEnd: '',
      participantCelular: '',
      reports: '',
      participant: {
        name: '',
        cpf: '',
        celular: '',
        enable: '',
        email: '',
        endereco: '',
        _id: '',
    }
  }
}

  handleChangeName(event) {
    this.setState({
      participantName: event.target.value
    })
  }

  handleChangeCelular(event) {
      this.setState({
        participantcelular: event.target.value
    })
  }

  handleChangeCpf(event) {
    this.setState({
      participantCpf: event.target.value
    })
  }

  handleChangeEmail(event) {
    this.setState({
      participantEmail: event.target.value
    })
  }

  handleChangeEnd(event) {
    this.setState({
      participantEnd: event.target.value
    })
  }

  componentDidMount(){
    const participantId = localStorage.getItem('user');
    axios.get(`http://localhost:3004/participant/${participantId}`)
    .then(response => {
        console.log(response.data);
        const participant = response.data;
        this.setState({ participant: participant.participant });
        this.setState({
          participantName: participant.participant.name,
          participantCpf: participant.participant.cpf,
          participantEmail: participant.participant.email,
          participantId: participant.participant._id,
          participantCelular: participant.participant.celular,
          participantEnd: participant.participant.endereco,
        });
        this.renderReports(participant.participant._id);
    });
  }

  renderReports(participantId){
    axios.get(`http://localhost:3003/report/${participantId}`)
    .then(response => {
        console.log(response.data);
          const report = response.data
          this.setState({ reports: report });
          console.log(this.state.reports);
      });
  }

  reports(){
    return(
      <Report participantIdReport={this.state.participantId} report={this.state.reports}/>
    );
  }

  registerparticipant(){
    const name = this.state.participantName;
    const email = this.state.participantEmail;
    const celular = this.state.participantCelular;
    const cpf = this.state.participantCpf;
    const participantId = this.state.participant._id;
    const endereco = this.state.participantEnd;


    const participant = {
      name,
      cpf,
      email,
      endereco,
      celular,
      admin: false
  };

  console.log(participantId);

  axios.put(`http://localhost:3004/participant/${participantId}`, participant)
      .then(response => {
          alert("sucess");
          console.log(response.data);
        })
  }
  
  render(){
    const { name, enable, email } = this.state.participant;

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
                            value={this.state.participantName}
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
                            value={this.state.participantEmail}
                            onChange={(event) => this.handleChangeEmail(event)}
                          />
                        </FormGroup>
                      </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                          <Label>celular</Label>
                          <Input 
                            required
                            type="number" 
                            placeholder="celular" 
                            value={this.state.participantCelular}
                            onChange={(event) => this.handleChangeCelular(event)}
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
                            value={this.state.participantCpf}
                            onChange={(event) => this.handleChangeCpf(event)}
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
                            value={this.state.participantEnd}
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
                        onClick={() => this.registerparticipant()}
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
