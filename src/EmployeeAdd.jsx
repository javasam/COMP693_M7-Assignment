import React from 'react'

// M7 Lecture 7: Added Container, Row, Col components to clean up the Add Employee form using the React Bootstrap Grid System
// M7 Lecture 9: Added Modal component in support of changing our 'Add Employee' form to a pop-up Modal
import { Button, Container, Row, Col, Modal } from 'react-bootstrap'

export default class EmployeeAdd extends React.Component {
    constructor() {
        super()
        this.state = {
            modalVisible: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleShowModal = this.handleShowModal.bind(this)
        this.handleHideModal = this.handleHideModal.bind(this)
    }

    handleShowModal() {
        this.setState({ modalVisible: true, })
    }

    handleHideModal() {
        this.setState({ modalVisible: false, })
    }

    // Removed e.preventDefault() from handleSubmit() since the form itself is not triggering the submission,
    // the button is now handling the submission via it’s onClick event
    handleSubmit(e) {
        const form = document.forms.employeeAdd
        const employee = {
            name: form.name.value,
            extension: form.ext.value,
            email: form.email.value,
            title: form.title.value,
        }
        this.props.createEmployee(employee)
        form.name.value = ''
        form.ext.value = ''
        form.email.value = ''
        form.title.value = ''
        this.setState({ modalVisible: false, })
    }

    // NOTE:  <></> is a shortcut for <React.Fragment></React.Fragment>
	render() {
		return (
            <React.Fragment>
                <div className="addEmployee">
                    <Button                          
                        variant="primary" 
                        size="sm" 
                        onClick={this.handleShowModal}>
                            New Employee
                    </Button>
                </div>
                <Modal show={this.state.modalVisible} onHide={this.handleHideModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Employee</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Container fluid>
                            <form name="employeeAdd">
                                <Row>
                                    <Col md={3}>Name:</Col>
                                    <Col md="auto"><input type="text" name="name" /></Col>
                                </Row>
                                <Row>
                                    <Col md={3}>Extension:</Col>
                                    <Col md="auto"><input type="text" name="ext" maxLength={4} /></Col>
                                </Row>
                                <Row>
                                    <Col md={3}>Email:</Col>
                                    <Col md="auto"><input type="text" name="email" /></Col>
                                </Row>
                                <Row>
                                    <Col md={3}>Title:</Col>
                                    <Col md="auto"><input type="text" name="title" /></Col>                                    
                                </Row>
                            </form>
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button 
                            type="submit" 
                            variant="success" 
                            size="sm" 
                            className="mt-4" 
                            onClick={this.handleSubmit}>
                                Add Employee
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
	}
}
