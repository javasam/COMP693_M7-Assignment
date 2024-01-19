import React from 'react'

// M7 Lecture 5:  Navigation Bar using React Bootstrap
//import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import Contents from './Contents.jsx'

function NavBar() {

    // M5 Lecture 2:  Using <a href.../> tags with the React Hash-based Routing Component
    // <a href="/">Home</a>
    // {' | '}
    // <a href="/#/employees">All Employees</a>
    // {' | '}
    // <a href="/#/report">Reports</a>

    // M5 Lecture 5:  Using React NavLink Component
    // <NavLink end to="/">Home</NavLink>
    // <Separator />
    // <NavLink to="/employees">All Employees</NavLink>
    // <Separator />
    // <NavLink to="/report">Reports</NavLink>

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Employee Management Application</Navbar.Brand>
            <Nav>
                <Nav.Link href="/employees">All Employees</Nav.Link>
                <Nav.Link href="/report">Reports</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default function Page() {
    return (
        <div>
            <NavBar />
            <Contents />
        </div>
    )
}
