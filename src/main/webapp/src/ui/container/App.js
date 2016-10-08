import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStub} from 'actions/stub';
import TopNav from 'component/TopNav';
import {Grid} from 'react-bootstrap';

export class App extends Component {

    render() {

        return (
            <div id="application">
                <Grid>
                    {/*<TopNav/>*/}
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({}),
    mapDispatchToProps = {};

export default connect((state) => mapStateToProps(state), mapDispatchToProps)(App);
