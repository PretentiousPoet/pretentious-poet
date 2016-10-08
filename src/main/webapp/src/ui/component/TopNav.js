import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap'

export default class TopNav extends Component {

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to={{pathname: '/'}} active={false}>
                            <p>Home</p>
                        </LinkContainer>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to={{pathname: '/hello'}}>
                        <NavItem eventKey={1} href="#">Hello</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{pathname: '/goodbye'}}>
                        <NavItem eventKey={2} href="#">Goodbye</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        );
    }
}