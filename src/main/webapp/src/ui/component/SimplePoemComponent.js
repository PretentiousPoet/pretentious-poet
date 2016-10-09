import React, {Component} from 'react';
import {Row, Col, Image} from 'react-bootstrap';

export default class SimplePoemComponent extends Component {

    static propTypes = {
        data: React.PropTypes.string,
        picture: React.PropTypes.string
    };

    poemParser = (poem) => {
        // let poemString = poem;
        let newPoemString;
        while ((newPoemString = poem.replace(/SpacE/g, '')) != poem) {
            poem = newPoemString;
        }

        let poemArr = poem.split(/NewlinE/);

        poemArr = poemArr.map((sentence, index) => {
            if(sentence == ''){
                return (<br key={index} />);
            } else {
                return (<p key={index}>{sentence}</p>);
            }

        });
        console.log(poemArr);



        return poemArr;
    };

    render() {
        const poemText = this.poemParser(this.props.data);
        const poemTitle = poemText.slice(0,1);
        const poemBody = poemText.slice(1);
        return (
            <div className="container" /*text-center*/>
                <Row>
                    <Col sm={3}>
                        <p></p>
                    </Col>
                    <Col sm={6}>
                        <Row>
                            <Col sm={12}>
                                <h1 style={{color: '#FFBEC2'}}>{poemTitle}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <div >
                                    {this.props.picture ?
                                        <Image src={this.props.picture}
                                               rounded
                                               responsive
                                               style={{
                                                   maxWidth: '100%',
                                                   height: 'auto',
                                                   marginTop: 'auto',
                                                   marginLeft: 'auto',
                                                   marginRight: 'auto',
                                                   marginBottom: '30px'
                                               }}/> : ''}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} className="text-center">
                                {/*<p className="lead">yes</p>*/}
                                {/*<p style={{whiteSpace: 'wrap'}}>*/}
                                    {poemBody}
                                {/*</p>*/}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={3}>
                        <p></p>
                    </Col>
                </Row>
            </div>
        );
    }
}