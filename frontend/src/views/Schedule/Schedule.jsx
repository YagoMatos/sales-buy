import React, { Component } from "react";
import axios from "axios"; 

import { 
    Card, 
    CardBody, 
    CardHeader, 
    CardTitle, 
    Table, 
    Row, 
    Col 
} from "reactstrap";

import ModalSchedule from "./ModalSchedule.jsx";
import TablePatient from '../TableList/TablePatient.jsx';

class Schedule extends Component {
    constructor () {
        super()
        this.state = {
          schedules: []
        }
      }

    componentDidMount(){
        axios.get(`http://localhost:3003/schedule/`)
        .then(response => {
            const schedule = response.data
            this.setState({ schedules: schedule.schedule });
            console.log(schedule);
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Agenda</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ModalSchedule/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="card-plain">
                    <CardHeader>
                        <CardTitle tag="h4">Consultas</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                        <thead className="text-primary">
                            <tr>
                                <th>Paciente</th>
                                <th>Data</th>
                                <th>Hora</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        { this.state.schedules.map(p => {
                                return (
                                <TablePatient
                                    key={p._id} 
                                    date={p.date}
                                    title={p.title}
                                    hour={p.hour}
                                    id={p._id}
                                    clicked={() => this.patientClicked(p._id)}
                                />
                                )
                            })}
                        </Table>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        );
    }
}

export default Schedule;
