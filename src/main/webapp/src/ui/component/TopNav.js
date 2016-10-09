import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

export default class TopNav extends Component {

    static propTypes = {
      path: React.PropTypes.string
    };

    render() {
        const {path} = this.props;
        return (
            <div>
                {/*<Navbar inverse className="navbar-fixed-top">*/}
                {/*<div className="noMarginOverride">*/}
                {/*<Navbar.Header>*/}
                {/*<IndexLinkContainer to={{pathname: '/'}}>*/}
                {/*<a href="/" className="pull-left">*/}
                {/*<img className="image"*/}
                {/*src={require('style/logo.png')}*/}
                {/*style={{height: '50px', width: '50px', paddingRight: '10px'}}*/}
                {/*/>*/}
                {/*</a>*/}
                {/*</IndexLinkContainer>*/}
                {/*<Navbar.Toggle />*/}
                {/*</Navbar.Header>*/}
                {/*</div>*/}
                {/*<Navbar.Collapse>*/}
                {/*<Nav>*/}
                {/*<IndexLinkContainer to={{pathname: '/'}}>*/}
                {/*<NavItem eventKey={1} href="#">Hello</NavItem>*/}
                {/*</IndexLinkContainer>*/}
                {/*<LinkContainer to={{pathname: '/poem'}}>*/}
                {/*<NavItem eventKey={2} href="#">Poem</NavItem>*/}
                {/*</LinkContainer>*/}
                {/*</Nav>*/}
                {/*</Navbar.Collapse>*/}
                {/*</Navbar>*/}
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="container noMarginOverride">
                        <div className="navbar-header">
                            <IndexLinkContainer to={{pathname: '/'}}>
                                <a href="/" className="pull-left">
                                    <img className="image"
                                         src={require('style/logo.png')}
                                         style={{height: '50px', width: '50px'}}
                                    />
                                </a>
                            </IndexLinkContainer>
                            <IndexLinkContainer to={{pathname: '/'}}>
                                <a className={path == '/'? 'navColorOverrideWhite navbar-brand noPaddingOverride' : 'navbar-brand noPaddingOverride'} href="">
                                    Pretentious Poet</a>
                            </IndexLinkContainer>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li>
                                    <LinkContainer to={{pathname: '/poem'}}>
                                        <a className={path == '/poem'? 'navColorOverrideWhite' : ''}>Poem</a>
                                    </LinkContainer>
                                </li>
                            </ul>
                        </div>

                    </div>

                </nav>

            </div>
        );
    }
}