import React, { Component } from "react";
import axios from 'axios';

import { Card, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";

import Stats from "../../../components/Stats/Stats.jsx";

class Dashboard extends Component {
  state = {
    participantLength: '',
    auctionLength: '',
  }

  componentDidMount(){
    const participantId = localStorage.getItem('user');
    axios.get(`http://localhost:3004/item/part/${participantId}`)
    .then(response => {
        const participant = response.data.item
        this.setState({ participantLength: participant.length });
        console.log(this.state.participantLength);
    });

    axios.get(`http://localhost:3004/auction/open`)
    .then(response => {
        const auction = response.data.auction
        this.setState({ auctionLength: auction.length });
        console.log(this.state.auctionLength);
    })

  }
  render() {
    return (
      <div className="content">
        <Row>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-bell-55 text-warning" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">Notificações</p>
                      <CardTitle tag="p">Nenhum</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-sync-alt",
                      t: "Atualizar"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-badge text-success" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">N° de Itens Adquiridos</p>
                      <CardTitle tag="p">{this.state.participantLength}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "far fa-calendar",
                      t: "Ultimo mês"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-chat-33 text-danger" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">Nº de Leilões Abertos</p>
                      <CardTitle tag="p">{this.state.auctionLength}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "far fa-clock",
                      t: "Ultima Semana"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
