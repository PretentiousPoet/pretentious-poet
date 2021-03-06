import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import StubPoemComponent from 'component/StubPoemComponent';
import SimplePoemComponent from 'component/SimplePoemComponent';

class Poem extends Component {

    render() {
        return (
            <div id="application">
                <SimplePoemComponent data={this.props.data.items}
                                     picture={this.props.url.url}
                />
            </div>
        );
    }
}

let mapStateToProps = (state) => ({data: state.stub, url: state.url}),
    mapDispatchToProps = {};

export default connect(
    (state) => mapStateToProps(state),
    mapDispatchToProps
)(Poem);