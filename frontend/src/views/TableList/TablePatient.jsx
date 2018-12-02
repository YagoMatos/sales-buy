import React from "react";
import axios from 'axios';

import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form,
    FormGroup,
    Label,
    ModalFooter,
    Input,
  Row,
  Col
} from "reactstrap";
import Button from "../../components/CustomButton/CustomButton.jsx";

class RegularTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          title: this.props.title,
          date: this.props.date,
          hour: this.props.hour,
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      changeTitle(event){
        this.setState({
            title: event.target.value
        })
      }

      changeDate(event){
        console.log(this.state.hour);
        this.setState({
            date: event.target.value
        })
      }

      changeHour(event){
        this.setState({
            hour: event.target.value
        })
      }
    editSchedule(){
        console.log(this.state.hour);

        const date = this.state.date;
        const title = this.state.title;
        const hour = this.state.hour;
        const scheduleId = this.props.id;

        const schedule = {
        date,
        title,
        hour
    };

        axios.put(`http://localhost:3003/schedule/${scheduleId}`, schedule)
            .then(response => {
                alert("sucess");
                window.location = "schedule"
                console.log(response.data);
            })
    }
    
    deleteMarck(id){
        console.log(id)
        axios.delete(`http://localhost:3003/schedule/${id}`)
        .then(response => {
            alert("sucess");
            console.log(response.data);
            window.location="schedule"
        })
    }

  render() {
    console.log(this.state.hour);
    return (
        <tbody>
            <tr  onClick={this.props.clicked} id={this.props.id}>
                <td>{this.props.title}</td>
                <td>{this.props.date}</td>
                <td>{this.props.hour}</td>
                <td><Button 
                    round 
                    onClick={this.toggle}
                    color="warning">
                        <i className="nc-icon nc-alert-circle-i"/>
                    </Button>
                </td>
                <td><Button 
                    round 
                    onClick={() => this.deleteMarck(this.props.id)}
                    color="danger">
                        <i className="nc-icon nc-simple-remove"/>
                    </Button>
                </td>

            </tr>
  
         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
         <ModalHeader toggle={this.toggle}>
           Consulta do Paciente  {this.props.title}
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
                            onChange={(event) => this.changeTitle(event)}
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
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                            id="exampleDate" 
                            value={this.state.date}
                            onChange={(event) =>  this.changeDate(event)}
                            placeholder="Escolha a Data" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup> 
                            <Label>Horário</Label>
                            <Input 
                                type="select"
                                value={this.state.hour}
                                onChange={(event) =>  this.changeHour(event)}
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
            <Button color="primary" onClick={() => this.editSchedule()}>Marcar</Button>
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        </tbody>
    );
  }
}

export default RegularTables;
