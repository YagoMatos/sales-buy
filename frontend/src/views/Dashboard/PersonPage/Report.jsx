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
    state = {
        items: [],
    }

    componentDidMount(){
        const participantId = localStorage.getItem('user')
        axios.get(`http://localhost:3004/item/part/${participantId}`)
        .then(response => {
            console.log(response.data);
                const item = response.data
                this.setState({ items: item.item });
                console.log(this.state.items);
                console.log(this.state.items.map( i => i.title));
            });
          
    }
    

    itemClicked(id){
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
                                <th className="d-flex justify-content-end">Visualizar Informações</th>
                            </tr>
                        </thead>
                        { 
                            this.state.items.map(item => {
                                return (
                                <ReportTable
                                    key={item._id} 
                                    title={item.title}
                                    salesman={item.salesman}
                                    value={item.value}
                                    description={item.description}
                                    id={item._id}
                                    clicked={() => this.itemClicked(item._id)}
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

export default Report;
