import React from 'react';
import axios from 'axios';

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
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      date: '',
      description: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  registerReport(){
    const title = this.state.title;
    const date = this.state.date;
    const description = this.state.description;
    const patientId = this.props.patientIdReport;

    const report = {
        date,
        description,
        title,
        patientId,
    };
  
    console.log(report);
  
    axios.post('http://localhost:3003/report/register', report)
        .then(response => {
            alert("sucess");
            window.location=`/patient/${patientId}`
        })
        .catch((error) => {
          alert("Sorry");
      });
        
    }

  render() {
      console.log(this.props.patientIdReport)
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
            Novo Relatório 
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Novo Relatório
        </ModalHeader>
          <ModalBody>
            <Form>
                 <Row>
                    <Col md={6} xs={12}>
                      <FormGroup> 
                          <Label>Assunto</Label>
                          <Input 
                            type="text" 
                            placeholder="Assunto do Relatório" 
                            value={this.state.title}
                            onChange={(event) => this.setState({ title: event.target.value })}
                          />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup> 
                            <Label>Data</Label>
                            <Input 
                                type="date" 
                                name="date" 
                                id="exampleDate" 
                                value={this.state.date}
                                onChange={(event) => this.setState({ date: event.target.value })}
                                placeholder="Escolha a Data" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup> 
                            <Label>Descrição</Label>
                            <Input 
                                type="textarea"
                                value={this.state.description}
                                placeholder="Descrição..." 
                                onChange={(event) => this.setState({ description: event.target.value })}
                            />
                        </FormGroup>
                      </Col>
                </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.registerReport()}>Cadastrar</Button>
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalSchedule;