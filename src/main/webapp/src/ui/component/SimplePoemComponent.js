import React, {Component} from 'react';
import {Row, Col, Image} from 'react-bootstrap';

export default class SimplePoemComponent extends Component {

    static propTypes = {
        data: React.PropTypes.array
    };

    render() {
        return (
            <div className="container text-center">
                <Row>
                    <Col md={12}>
                        <h1 style={{color: '#FFBEC2'}}>header</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Image src='https://upload.wikimedia.org/wikipedia/commons/f/fb/Welchcorgipembroke.JPG'
                                rouded
                               style={{maxHeight: '300px', maxWidth: '500px'}}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/*<p className="lead">yes</p>*/}
                        <p>Put Ya Poems Here!</p>
                        <p> This is a poem,<br />
                            I like poems, <br />
                            I also like waffles.
                        </p>
                        <p>{this.props.data}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}