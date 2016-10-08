import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SimplePoemComponent from 'component/SimplePoemComponent';

class Poem extends Component {

    render() {
        return (
            <div id="application">
                <SimplePoemComponent data={this.props.data.items}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({data: state.stub}),
    mapDispatchToProps = {};

export default connect(
    (state) => mapStateToProps(state),
    mapDispatchToProps
)(Poem);