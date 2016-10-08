import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import GoodbyeComponent from 'component/GoodbyeComponent';

class Goodbye extends Component {

    render() {
        return (
            <div id="application">
                <GoodbyeComponent/>
            </div>
        );
    }
}

let mapStateToProps = () => ({}),
    mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Goodbye);