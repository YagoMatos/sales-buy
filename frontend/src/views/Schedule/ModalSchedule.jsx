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
      hour: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  markSchedule(){
    const title = this.state.title;
    const date = this.state.date;
    const hour = this.state.hour;

    const schedule = {
        date,
        hour,
        title,
    };
  
    console.log(schedule);
  
    axios.post('http://localhost:3003/schedule/register', schedule)
        .then(response => {
            alert("sucess");
            window.location="/schedule"
        })
        .catch((error) => {
          alert("Horário Já marcado!");
      });
        
    }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
            Nova Consulta 
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Marcar Consulta
        </ModalHeader>
          <ModalBody>
            <Form>
                 <Row>
                    <Col md={12} xs={12}>
                      <FormGroup> 
                          <Label>Nome do Paciente</Label>
                          <Input 
                            type="text" 
                            placeholder="Nome do Paciente" 
                            value={this.state.title}
                            onChange={(event) => this.setState({ title: event.target.value })}
                          />
                        </FormGroup>
                      </Col>
                </Row>
                <Row>
                <Col md={6} xs={12}>
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
                    <Col md={6}>
                        <FormGroup> 
                            <Label>Horário</Label>
                            <Input 
                                type="select"
                                value={this.state.hour}
                                onChange={(event) => this.setState({ hour: event.target.value })}
                                >
                                <option></option>
                                <option>09:00</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                                <option>16:00</option>
                                <option>17:00</option>
                                <option>18:00</option>
                            </Input>
                        </FormGroup>
                      </Col>
                </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.markSchedule()}>Marcar</Button>
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalSchedule;