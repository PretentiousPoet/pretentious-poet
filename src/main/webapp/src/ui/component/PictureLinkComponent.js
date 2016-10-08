import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {browserHistory} from 'react-router';

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
            <form>
                <FormGroup controlId="picSubmit" validationState={this.getValidationState()}>
                    <ControlLabel>
                        A picture is worth a thousand words,
                        let's see some of them.
                    </ControlLabel>
                </FormGroup>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
                <Button onClick={() => this.props.fetchData(this.onSuccess())}>
                    Fetch Data
                </Button>
            </form>
        );
    }
}