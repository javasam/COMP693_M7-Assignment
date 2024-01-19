import React from 'react'

// M7 Lecture 6:  Added 'Card' to our import for stylizng the EmployeeFilter within a Card
import { Card } from 'react-bootstrap'

// M5 Lecture 5:  Added { Link }
//import { Link } from 'react-router-dom'

// M5 Lecture 6:  Replaced { Link } with { useNavigate }
// M6 Lecture 2:  Add useSearchParams Hook to fix 'Currently Employed' pulldown value during browser refresh
import { useNavigate, useSearchParams } from 'react-router-dom'

// M5 Lecture 6:  To use REACT HOOKS, we must change 'EmployeeFilter' from a React Class Component to a React Function Component
//                REACT HOOKS ONLY WORK IN REACT FUNCTION COMPONENTS!!!


// M5 Lecture 6:  Now using programatic navigation (via a pulldown list)
export default function EmployeeFilter() {
	const navigate = useNavigate()

	// M6 Lecture 2:  Added to fix 'Currently Employed' pulldown value during browser refresh
	const [ searchParams ] = useSearchParams()

	return (
        <Card>
            <Card.Header as="h5">Filter </Card.Header>
            <Card.Body>
                <Card.Text>
					Currently Employed:
					{' '}
					<select 
						// M6 Lecture 2:  Added to fix 'Currently Employed' pulldown value during browser refresh
						value = {searchParams.get('employed') || ''}

						onChange={(e) => navigate(
							e.target.value ? 
							`/employees?employed=${e.target.value}` : 
							`/employees`
						)}>
						<option value="">All</option>
						<option value="true">Employed</option>
						<option value="false">Not Employed</option>
					</select>
				</Card.Text>
            </Card.Body>
        </Card>
	)
}

// export default class EmployeeFilter extends React.Component {
	// M5 Lecture 4:  Added <a href... /> links to filter our employee list
	// Filter:{' '}
	// <a href="/#/employees">All Employees</a>
	// {' | '}
	// <a href="/#/employees?employed=true">Employed</a>
	// {' | '}
	// <a href="/#/employees?employed=false">Not Employed</a>

	// M5 Lecture 5:  Now using the React Link Component instead of <a href... /> tags
	// Filter:
	// <Link to={{ pathname: '/employees'}}>All Employees</Link>
	// <Separator />
	// <Link to={{ pathname: '/employees', search: '?employed=true'}}>Employed</Link>
	// <Separator />
	// <Link to={{ pathname: '/employees', search: '?employed=false'}}>Employed</Link>

// 	render() {
// 		const Separator = () => <span> | </span>
// 		return (
// 			<div>
// 				Filter:
// 				<Link to={{ pathname: '/employees'}}>All Employees</Link>
// 				<Separator />
// 				<Link to={{ pathname: '/employees', search: '?employed=true'}}>Employed</Link>
// 				<Separator />
// 				<Link to={{ pathname: '/employees', search: '?employed=false'}}>Employed</Link>
// 			</div>
// 		)
// 	}
// }
