import React, {Component} from 'react';
import {Row, Col, Image} from 'react-bootstrap';

export default class SimplePoemComponent extends Component {

    static propTypes = {
        data: React.PropTypes.array,
        picture: React.PropTypes.string
    };

    poemParser = (poem) => {
        // let poemString = poem;
        let newPoemString;
        while((newPoemString = poem.replace(/NewlinE/g, '\n').replace(/SpacE/g, ' ')) != poem){
            poem = newPoemString;
        }

        return poem;
    };

    render() {
        const poem = this.poemParser(this.props.data);
        return (
            <div className="container text-center">
                <Row>
                    <Col md={12}>
                        <h1 style={{color: '#FFBEC2'}}>header</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {this.props.picture ? <Image src={this.props.picture}
                               rouded
                               style={{maxHeight: '300px', maxWidth: '500px'}}/> : ''}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/*<p className="lead">yes</p>*/}
                        <p style={{whiteSpace: 'pre'}}>{poem}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}