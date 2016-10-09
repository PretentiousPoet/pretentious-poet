import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchStub, clearPoem} from 'actions/stub';
import {setURL} from 'actions/url';
import PictureLinkComponent from 'component/PictureLinkComponent';
import HomeComponent from 'component/HomeComponent';
import {Row, Col} from 'react-bootstrap';
import {browserHistory} from 'react-router';

class Home extends Component {

    getRequest = (url) => {
        this.props.clearPoem();
        this.props.fetchStub(url, () => this.onSuccess());
    };

    onSuccess = () => {
        browserHistory.push("/poem");
    };

    render() {
        return (
            <div id="application" className="text-center">
                <Row>
                    <HomeComponent/>
                </Row>
                <Row>
                    <PictureLinkComponent
                        fetchData={(url) => this.getRequest(url)}
                        setURL={this.props.setURL.bind(this)}
                        data={this.props.data}/>
                </Row>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
        return {data: state.stub};
    },
    mapDispatchToProps = {fetchStub, setURL, clearPoem};

export default connect(
    (state) => mapStateToProps(state),
    mapDispatchToProps
)(Home);