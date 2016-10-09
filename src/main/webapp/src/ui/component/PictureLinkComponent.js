import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {Row, Col, Form} from 'react-bootstrap';

export default class PictureLinkComponent extends Component {

    static propTypes = {
        fetchData: React.PropTypes.func,
        setURL: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    };


    render() {
        return (
            <Col md={12}>
                <Form>
                    <Row>
                        <Col md={12}>
                            <FormGroup controlId="picSubmit" validationState={''}>
                                <Row>
                                    <Col md={12}>
                                        <ControlLabel>
                                            A picture is worth a thousand words,
                                            let's see some of them.
                                        </ControlLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <ControlLabel>
                                            Paste an image URL
                                            you'd like to make a poem for.
                                        </ControlLabel>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormControl
                                style={{
                                    maxWidth: '400px',
                                    margin: 'auto'/*, backgroundColor:'gray', borderColor:'#777'*/
                                }}
                                type="text"
                                value={this.state.value}
                                placeholder="Enter a URL"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </Col>
                    </Row>
                    <Row style={{paddingTop: '20px'}}>
                        <Col md={12}>
                            <Button type="submit" onClick={(e) => {
                                e.preventDefault();
                                this.props.fetchData(this.state.value);
                                this.props.setURL(this.state.value);
                            }}
                                    style={{backgroundColor: '#FFBEC2'}}>
                                Generate Poem
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        );
    }
}