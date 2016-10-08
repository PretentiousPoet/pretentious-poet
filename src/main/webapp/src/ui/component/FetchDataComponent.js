import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class FetchDataComponent extends Component {

    static propTypes = {
        fetchData: React.PropTypes.func,
        data: React.PropTypes.object
    };

    render() {
        return (
            <div>
                <Button onClick={() => this.props.fetchData()}>
                    Fetch Data
                </Button>
                <p>{this.props.data.items}</p>
            </div>
        );
    }
}