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

import ModalItem from "./ModalItem";
import TableItemsAble from './TableItemsAble';
import TableItemsUnable from './TableItemsUnable';

class Item extends Component {
    state = {
        itemsAble: [],
        itemsUnableAble: [],
        items: []
    }

    componentDidMount(){
        axios.get(`http://localhost:3004/item/close`)
        .then(response => {
            const item = response.data
            this.setState({ itemsUnableAble: item.item });
            console.log(item);
        });
        axios.get(`http://localhost:3004/item/open`)
        .then(response => {
            const item = response.data
            this.setState({ itemsAble: item.item });
            console.log(item);
        });
      }

      itemClicked(id){
        console.log(id)
      }

    render(){
        return (
            <div className="content">
                <Row>
                <Col md={12}>
                    <Card>
                        <CardBody>
                            <h5>Itens do Leilão</h5>
                            <ModalItem/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="card-plain">
                    <CardHeader>
                        <CardTitle tag="h4">Itens Disponíveis</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead className="text-primary">
                                <tr>
                                    <th>Nome</th>
                                    <th>Vendedor</th>
                                    <th>Valor</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            { this.state.itemsAble.map(item => {
                                return (
                                <TableItemsAble
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
            <Row>
                <Col xs={12}>
                    <Card className="card-plain">
                    <CardHeader>
                        <CardTitle tag="h4">Itens Leiloados</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead className="text-primary">
                                <tr>
                                    <th>Nome</th>
                                    <th>Vendedor</th>
                                </tr>
                            </thead>
                            { this.state.itemsUnableAble.map(item => {
                                return (
                                <TableItemsUnable
                                    key={item._id} 
                                    title={item.title}
                                    salesman={item.salesman}
                                    id={item._id}
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

export default Item;
