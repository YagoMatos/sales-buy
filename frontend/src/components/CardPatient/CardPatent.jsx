import React, {Component} from 'react';
import { Card, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class CardPatient extends Component{
    render(){
        return(  
                <Link to={{
                    pathname:`patient/${this.props.id}`
                }}> 
                    <Card onClick={this.props.clicked}>
                        <CardBody>
                            {this.props.name}
                        </CardBody>
                    </Card>
                </Link>
            
        )
    }
};

export default CardPatient;