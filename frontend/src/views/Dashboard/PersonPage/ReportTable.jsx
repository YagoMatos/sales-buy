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
import Button from "../../../components/CustomButton/CustomButton.jsx";

//import { thead, tbody } from "../../variables/general";

class ReportTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            title: this.props.title,
            value: this.props.value,
            salesman: this.props.salesman,
            description: this.props.description
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      
  render() {
    return (
        <tbody>
            <tr  onClick={this.props.clicked} id={this.props.id}>
                <td>{this.props.title}</td>
                <td className="text-right"><Button 
                    round 
                    onClick={this.toggle}
                    color="warning">
                        <i className="nc-icon nc-alert-circle-i"/>
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
                    <Col md={12} xs={12}>
                      <FormGroup> 
                          <Label>Nome do Item</Label>
                          <Input 
                            type="text" 
                            disabled
                            placeholder="Nome do Item" 
                            value={this.state.title}
                          />
                        </FormGroup>
                      </Col>
                </Row>
                <Row>
                <Col md={6} xs={12}>
                    <FormGroup> 
                        <Label>Valor</Label>
                        <Input 
                            type="number" 
                            name="value" 
                            value={this.state.value}
                            disabled
                            placeholder="Valor" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup> 
                            <Label>Vendedor</Label>
                            <Input 
                                type="text"
                                placeholder="Vendedor"
                                disabled
                                value={this.state.salesman}
                                >
                            </Input>
                        </FormGroup>
                      </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup> 
                        <Label>Descrição</Label>
                          <Input 
                              type="textarea"
                              placeholder="Descrição"
                              disabled
                              value={this.state.description}
                              >
                            </Input>
                      </FormGroup>
                  </Col>
                </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Ok</Button>
          </ModalFooter>
        </Modal>
        </tbody>
    );
  }
}

export default ReportTable;
