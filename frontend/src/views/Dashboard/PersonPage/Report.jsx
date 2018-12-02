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
                <Col xs={12}>
                    <Card className="card-plain">
                    <CardHeader>
                        <CardTitle tag="h4">Itens Adiquiridos</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                        <thead className="text-primary">
                            <tr>
                                <th>Nome do Item</th>
                                <th>Visualizar Informações</th>
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
