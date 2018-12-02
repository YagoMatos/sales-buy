import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import Button from "../../components/CustomButton/CustomButton.jsx";


class PatientPage extends React.Component {

  render(){
    return (
      <div className="content">
        <Row>
          <Col md={12} xs={12}>
            <Row>
                <div className="update ml-auto mr-auto">
                    <Link to="/patient-search">
                        <Button color="info" round>
                            Pesquisar Paciente    
                        </Button>
                    </Link>
                </div>
            </Row>
            <Row>
                <div className="update ml-auto mr-auto">
                    <Link to="/patient-register">
                        <Button color="success" round>
                            Cadastrar Paciente    
                        </Button>
                    </Link>
                </div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PatientPage;
