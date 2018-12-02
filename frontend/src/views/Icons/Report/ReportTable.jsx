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

//import { thead, tbody } from "../../variables/general";

class ReportTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          title: this.props.title,
          date: this.props.date,
          description: this.props.description,
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
        this.setState({
            date: event.target.value
        })
      }

      changeDesc(event){
        this.setState({
            description: event.target.value
        })
      }
      
      editReport(){
        const date = this.state.date;
        const title = this.state.title;
        const description = this.state.description;
        const reportId = this.props.id;
        const patientId = this.props.patientIdReport;

        const report = {
        date,
        title,
        description,
        reportId,
        patientId
    };

    axios.put(`http://localhost:3003/report/${reportId}`, report)
        .then(response => {
            alert("sucess");
            window.location = `/patient/${patientId}`
            console.log(response.data);
        })
    }

    deleteReport(reportid, patientId){
        console.log(reportid)
        axios.delete(`http://localhost:3003/report/${reportid}`)
        .then(response => {
            alert("sucess");
            window.location = `/patient/${patientId}`
            console.log(response.data);
        })
    }

    
   

  render() {
    return (
        <tbody>
            <tr  onClick={this.props.clicked} id={this.props.id}>
                <td>{this.props.date}</td>
                <td><Button 
                    round 
                    onClick={this.toggle}
                    color="warning">
                        <i className="nc-icon nc-alert-circle-i"/>
                    </Button>
                </td>
                <td><Button 
                    round 
                    onClick={() => this.deleteReport(this.props.id, this.props.patientIdReport)}
                    color="danger">
                        <i className="nc-icon nc-simple-remove"/>
                    </Button>
                </td>

            </tr>
  
         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
         <ModalHeader toggle={this.toggle}>
           {this.props.title}
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
                            onChange={(event) => this.changeTitle(event)}
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
                                onChange={(event) => this.changeDate(event)}
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
                                onChange={(event) => this.changeDesc(event)}
                            />
                        </FormGroup>
                      </Col>
                </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editReport()}>Salvar</Button>
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        </tbody>
    );
  }
}

export default ReportTable;
