import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStub} from 'actions/stub';
import TopNav from 'component/TopNav';
import {Grid} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';
import FooterComponent from 'component/FooterComponent';

export class App extends Component {

    render() {
        return (
            <div id="application">
                <Grid>
                    <Row>
                        <TopNav path={this.props.routing.pathname}/>
                    </Row>
                    <Row>
                        {this.props.children}
                    </Row>
                    <Row>
                        <FooterComponent />
                    </Row>
                </Grid>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({routing: state.routing.locationBeforeTransitions}),
    mapDispatchToProps = {};

export default connect((state) => mapStateToProps(state), mapDispatchToProps)(App);
