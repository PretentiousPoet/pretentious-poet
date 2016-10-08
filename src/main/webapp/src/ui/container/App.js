import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStub} from 'actions/stub';
import FetchDataComponent from 'component/FetchDataComponent';
import TopNav from 'component/TopNav';

export class App extends Component {

    render() {

        return (
            <div id="application">
                <TopNav/>
                {this.props.children}
                <FetchDataComponent
                    fetchData={() => this.props.fetchStub()}
                    data={this.props.data}/>
            </div>
        );
    }
}

const maStateToProps = (state) => {
    return {
        data: state.stub
    };
};
const mapDispatchToProps = {fetchStub};

export default connect((state) => maStateToProps(state), mapDispatchToProps)(App);
