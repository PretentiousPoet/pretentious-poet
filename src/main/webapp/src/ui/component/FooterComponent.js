import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

export default class FooterComponent extends Component {

    render() {
        return (
            <footer>
                <div className="footer-below">
                    <div className="container">
                        <Row>
                            <Col md={12} className="text-center">
                                Copyright &copy; PretentiousPoet 2016
                            </Col>
                        </Row>
                    </div>
                </div>
            </footer>
        );
    }
}