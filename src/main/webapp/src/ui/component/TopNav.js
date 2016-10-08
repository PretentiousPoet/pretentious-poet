import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap'

export default class TopNav extends Component {

    render() {
        return (
            <Navbar>
                <Nav>
                    <IndexLinkContainer to={{pathname: '/'}}>
                        <NavItem eventKey={1} href="#">Hello</NavItem>
                    </IndexLinkContainer>
                    <LinkContainer to={{pathname: '/poem'}}>
                        <NavItem eventKey={2} href="#">Poem</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        );
    }
}