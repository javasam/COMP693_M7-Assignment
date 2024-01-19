import React from 'react'

// M7 Lecture 6:  Added 'Card' to our import for stylizng the EmployeeReport placeholder within a Card
import { Card } from 'react-bootstrap'

export default function EmployeeReport() {
    return (
        <Card>
            <Card.Header as="h5">Employee Report </Card.Header>
            <Card.Body>
                <Card.Text>
                    This is a placeholder for the employee report.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
