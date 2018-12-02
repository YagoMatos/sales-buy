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

import TableItemsAuction from "./TableItemsAuction";
import TableOpenAuction from './TableOpenAuction';
import TableCloseAuction from './TableCloseAuction';

class Auction extends Component {
    state = {
        auctionOpen: [],
        auctionClose: [],
        auctions: [],
        items: []
    }

    componentDidMount(){
        axios.get(`http://localhost:3004/auction/close`)
        .then(response => {
            const auction = response.data
            this.setState({ auctionClose: auction.auction });
            console.log(auction);
        });
        axios.get(`http://localhost:3004/auction/open`)
        .then(response => {
            const auction = response.data
            this.setState({ auctionOpen: auction.auction });
            console.log(auction);
        });
        axios.get(`http://localhost:3004/item/avaliable`)
        .then(response => {
            const item = response.data
            this.setState({ items: item.item });
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
                                { this.state.items.map(item => {
                                    return (
                                    <TableItemsAuction
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
                        <CardTitle tag="h4">Leilões Abertos</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead className="text-primary">
                                <tr>
                                    <th>Item Leiloado</th>
                                    <th>Vendedor</th>
                                    <th>Valor</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            { this.state.auctionOpen.map(auc => {
                                    console.log(auc)
                                return (

                                <TableOpenAuction
                                    key={auc._id} 
                                    title={auc.itemName}
                                    salesman={auc.salesman}
                                    value={auc.value}
                                    description={auc.itemDescription}
                                    id={auc._id}
                                    idItem={auc.itemId}
                                    isAuction={auc.isAuction}
                                    clicked={() => this.itemClicked(auc._id)}
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
                        <CardTitle tag="h4">Leilões Finalizados</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead className="text-primary">
                                <tr>
                                    <th>Item Leiloado</th>
                                    <th>Vendedor</th>
                                    <th>Comprador</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            { this.state.auctionClose.map(auc => {
                                return (
                                <TableCloseAuction
                                    key={auc._id} 
                                    title={auc.itemName}
                                    salesman={auc.salesman}
                                    participantName={auc.participantName}
                                    value={auc.value}
                                    id={auc._id}
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

export default Auction;
