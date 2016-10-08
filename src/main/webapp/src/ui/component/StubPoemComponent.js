import React, {Component} from 'react';

export default class StubPoemComponent extends Component {

    static propTypes = {
        data: React.PropTypes.array
    };

    render() {
        return (
            <div>
                <h1>Put Ya Poems Here!</h1>
                <p> This is a poem,<br />
                    I like poems, <br />
                    I also like waffles.
                </p>
                <p>{this.props.data}</p>
            </div>
        );
    }
}