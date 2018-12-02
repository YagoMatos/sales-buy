import React, { Component } from "react";
import axios from 'axios';

import { 
    Card, 
    CardBody, 
    CardHeader, 
    CardTitle, 
    Table, 
    Row, 
    Col 
} from "reactstrap";

import ModalReport from "./ModalReport";
import ReportTable from './ReportTable.jsx';

class Report extends Component {
    constructor () {
        super()
        this.state = {
          report: '',
        }
      }

    reportClicked(id){
    console.log(id)
    }

    render(){
        return (
            <div className="content">
                <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Relatórios das Consultas</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ModalReport patientIdReport={this.props.patientIdReport}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="card-plain">
                    <CardHeader>
                        <CardTitle tag="h4">Relatórios</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                        <thead className="text-primary">
                            <tr>
                                <th>Data da Consula</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        { 
                            this.props.report.length !== 0 ? 
                            this.props.report.report.map(repo => {
                                return (
                                <ReportTable
                                    key={repo._id} 
                                    date={repo.date}
                                    title={repo.title}
                                    id={repo._id}
                                    patientIdReport={this.props.patientIdReport}
                                    clicked={() => this.reportClicked(repo._id)}
                                />
                                )
                            }) : null
                            
                        }
                        </Table>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        );
    }
}

export default Report;
