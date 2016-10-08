import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStub} from 'actions/stub';
import TopNav from 'component/TopNav';

export class App extends Component {

    render() {

        return (
            <div id="application">
                <TopNav/>
                {this.props.children}
            </div>
        );
    }
}

let mapStateToProps = (state) => ({}),
    mapDispatchToProps = {};

export default connect((state) => mapStateToProps(state), mapDispatchToProps)(App);
