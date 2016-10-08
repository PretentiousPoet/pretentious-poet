import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

export default class HomeComponent extends Component {

    render() {
        return (
            <Col md={12}>
                <h1 style={{color: '#FFBEC2'}}>
                    Hello, World!
                </h1>
            </Col>
        );
    }
}