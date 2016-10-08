import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

export default class SimplePoemComponent extends Component {

    static propTypes = {
        data: React.PropTypes.array
    };

    render() {
        return (
            <div className="container">
                <Row>
                    <Col md={12} className="text-center">
                        <h1>header</h1>
                        <p className="lead">yes</p>
                    </Col>
                </Row>


                <footer className="text-center">
                    <div className="footer-below">
                        <div className="container">
                            <Row>
                                <Col md={12}>
                                    Copyright &copy; Your Website 2016
                                </Col>
                            </Row>
                        </div>
                    </div>
                </footer>
            </div>

        );
    }
}