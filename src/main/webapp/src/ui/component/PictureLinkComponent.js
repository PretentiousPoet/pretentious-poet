import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {Row, Col} from 'react-bootstrap';

export default class PictureLinkComponent extends Component {

    static propTypes = {
        fetchData: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    };

    onSuccess = () => {
        browserHistory.push("/poem");
    };


    render() {
        return (
            <Col md={12}>
                <form>
                    <Row>
                        <Col md={12}>
                            <FormGroup controlId="picSubmit" validationState={this.getValidationState()}>
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
                                            Enter a URL
                                            for a picture you'd like to make poem for.
                                        </ControlLabel>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Enter URL"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </Col>
                    </Row>
                    <Row style={{paddingTop: '20px'}}>
                        <Col md={12}>
                            <Button onClick={() => this.props.fetchData(this.onSuccess())}
                                    style={{backgroundColor: '#FFBEC2'}}>
                                Fetch Data
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Col>
        );
    }
}