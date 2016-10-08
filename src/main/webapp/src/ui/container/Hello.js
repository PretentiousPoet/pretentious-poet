import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import HelloComponent from 'component/HelloComponent';

class Hello extends Component {

    render() {
        return (
            <div id="application">
                <HelloComponent/>
            </div>
        );
    }
}

let mapStateToProps = () => ({}),
    mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hello);