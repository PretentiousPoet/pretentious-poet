import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchStub} from 'actions/stub';
import PictureLinkComponent from 'component/PictureLinkComponent';
import HomeComponent from 'component/HomeComponent';

class Home extends Component {

    render() {
        return (
            <div id="application">
                <HomeComponent/>
                <PictureLinkComponent
                    fetchData={() => this.props.fetchStub()}
                    data={this.props.data}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
        return {data: state.stub};
    },
    mapDispatchToProps = {fetchStub};

export default connect(
    (state) => mapStateToProps(state),
    mapDispatchToProps
)(Home);