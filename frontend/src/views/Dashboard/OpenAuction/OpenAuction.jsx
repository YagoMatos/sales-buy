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

import TableOpenAuction from './TableOpenAuction.jsx';

class OpenAuction extends Component {
    constructor () {
        super()
        this.state = {
            auctionOpen: []
        }
      }

    componentDidMount(){
        axios.get(`http://localhost:3004/auction/open`)
        .then(response => {
            const auction = response.data
            this.setState({ auctionOpen: auction.auction });
            console.log(auction);
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
        </div>
        );
    }
}

export default OpenAuction;
