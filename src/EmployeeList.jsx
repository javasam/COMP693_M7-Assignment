import React from 'react'

// M7 Lecture 2:  2 ways to import the React Bootstrap 'Badge' Component
// M7 Lecture 3:  Added 'Button' to our import for stylizing the DELETE buttons
// M7 Lecture 4:  Added 'Table' to our import for stylizing the EmployeeList table
// M7 Lecture 6:  Added 'Card' to our import for stylizng the EmployeeList table within a Card
// M7 Assignment:  Added 'Modal' to our import for the pop-up Delete Employee 'are you sure?' Modal prompt
//import Badge from 'react-bootstrap/Badge'     // Imports the Component Directly
//import { Badge } from 'react-bootstrap'       // Imports the indivual Badge Class from the React Bootstrap Component
import { Badge, Button, Table, Card, Modal } from 'react-bootstrap'

import { useLocation, Link } from 'react-router-dom'
import EmployeeFilter from './EmployeeFilter.jsx'
import EmployeeAdd from './EmployeeAdd.jsx'

function EmployeeTable (props) {
    // GET THE URL
    const { search } = useLocation()

    // GET THE PARAMETERS FROM THE URL
    const query = new URLSearchParams(search)

    // GET THE 'EMPLOYED' PARAMETER, SPECIFICALLY
    const q = query.get('employed')

    const employeeRows = props.employees
        .filter(employee => (q ? String(employee.currentlyEmployed) === q : true))
        .map(employee =>
        <EmployeeRow 
            key={employee._id} 
            employee={employee}
            deleteEmployee={props.deleteEmployee} />)
    return (
        <Card>
            <Card.Header as="h5">All Employees <Badge bg="secondary">{employeeRows.length}</Badge></Card.Header>
            <Card.Body>
                <Card.Text>
                    <Table striped size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Extension</th>
                                <th>Email</th>
                                <th>Title</th>
                                <th>Date Hired</th>
                                <th>Currently Employed?</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>                    
                            { employeeRows }
                        </tbody>
                    </Table>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

// M7 Assignment: Converted EmployeeRow from a stateless React Function Component to a React Class Component
// M7 Assignment: Added a 'Modal' pop-up for the Delete Employee [X], prompting the user 'Are you sure?'
//function EmployeeRow(props) {
export class EmployeeRow extends React.Component {
    constructor() {
        super()
        this.state = { modalVisible: false }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    toggleModal() {
        //console.log('Delete X clicked')
        this.setState({ modalVisible: !this.state.modalVisible })
    }

    handleDelete() {
        //console.log('Yes button clicked')
        this.props.deleteEmployee(this.props.employee._id)
        this.setState({ modalVisible: false, })
    }

    // M5 Lecture 4:  The following <td> tag demonstrates how to use the Query String
    // <td><a href={`/#/edit/${props.employee._id}`}>Edit</a></td>

    // M5 Lecture 5:  The following <td> tag demonstrates how to use the Link component
    // <td><Link to={`/edit/${props.employee._id}`}>Edit</Link></td>

    // orig code:  <Button variant="danger" size="sm" onClick={onDeleteClick}>X</Button>
    // orig code:  <Modal show={this.state.modalVisible} onHide={this.toggleModal} centered>

    render() {
        return (
            <tr>
                <td><Link to={`/edit/${this.props.employee._id}`}>{this.props.employee.name}</Link></td>
                <td>{this.props.employee.extension}</td>
                <td>{this.props.employee.email}</td>
                <td>{this.props.employee.title}</td>
                <td>{this.props.employee.dateHired.toDateString()}</td>
                <td>{this.props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={this.toggleModal}>X</Button>                
                    <Modal show={this.state.modalVisible} onHide={this.toggleModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Employee?</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Are you sure you want to delete this employee?
                        </Modal.Body>

                        <Modal.Footer>
                            <Button 
                                type="submit" 
                                variant="danger" 
                                className="mt-4" 
                                onClick={this.toggleModal}>
                                    Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                variant="success" 
                                className="mt-4" 
                                onClick={this.handleDelete}>
                                    Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>                
                </td>
            </tr>
        )
    }
}

export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = { employees: [] }
        this.createEmployee = this.createEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        // M3 Lecture 8:  Final 'loadData()' code for 'this.setState' with 'employees' data from 'initialEmployees' array

        
        // setTimeout(() => {
        //     this.setState({ employees: initialEmployees })
        // }, 500)     // half of a second

        // M4 Lecture 2:  New 'loadData()' code for 'this.setState' with 'employees' data from MongoDB
        fetch('/api/employees')
            .then(response => response.json())
            .then(data => {
                // M7 Lecture 6:  Replaced displaying count in console with displaying count in React Bootstrap Badge in table
                //console.log('Total count of employees:', data.count)
                data.employees.forEach(employee => {
                    employee.dateHired = new Date(employee.dateHired)
                })
                this.setState({ employees: data.employees })
            })
            .catch(err => {console.log(err)})
    }

    createEmployee(employee) {
        // // M4 Lecture 3:  The following statements are no longer needed
        // employee.id = this.state.employees.length + 1
        // const newEmployeeList = this.state.employees.slice()
        // newEmployeeList.push(employee)
        // removed from .then(newEmployee):  console.log('Total count of employees:', newEmployees.length)
        fetch('/api/employees', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(employee),
        })
        .then(response => response.json())
        .then(newEmployee => {
            newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired)
            const newEmployees = this.state.employees.concat(newEmployee.employee)
            this.setState({ employees: newEmployees })            
        })
        .catch(err => {console.log(err)})
    }

    deleteEmployee(id) {
        fetch(`/api/employees/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                console.log('Failed to delete employee.')
            } else {
                this.loadData()
            }
        })
        .catch(err => {console.log(err)})
    }

	render() {
		return (
            <React.Fragment>
                <EmployeeAdd createEmployee={this.createEmployee}/>
                <EmployeeFilter />
                <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee}/>
            </React.Fragment>
        )
	}
}
