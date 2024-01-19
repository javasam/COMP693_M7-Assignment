import express from 'express'
import {getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee} from '../controllers/employees.js'

const router = express.Router()

// ORIGINAL SETUP
// router.routes('/api/v1/employees).get(TBD)
// router.routes('/api/v1/employees).post(TBD)
// router.routes('/api/v1/employees/:id).get(TBD)
// router.routes('/api/v1/employees/:id).patch(TBD)
// router.routes('/api/v1/employees/:id).delete(TBD)

// NOTE:  You also don't have to spell out '/api/v1/employees' for the route path... this is because we added 
//        the following line to the app.js file:  app.use('/api/v1/employees', routes)
// router.route('/').get(TBD)          // notice we're not putting router.routes('/api/v1/employees').get(TBD)
// router.route('/').post(TBD)         // notice we're not putting router.routes('/api/v1/employees').post(TBD)
// router.route('/:id').get(TBD)       // notice we're not putting router.routes('/api/v1/employees/:id').get(TBD)
// router.route('/:id').patch(TBD)     // notice we're not putting router.routes('/api/v1/employees/:id').patch(TBD)
// router.route('/:id').delete(TBD)    // notice we're not putting router.routes('/api/v1/employees/:id').delete(TBD)



// MORE SIMPLE WAY OF DOING ALL THIS...
// M4 Lecture 1:  Since 'index.html' is already associated with '/', we want 'getAllEmployees' to be associated
//                with the '/api/employees' endpoint
//router.route('/')
router.route('/api/employees')
    //.get(() => {console.log('get all employees')})              // Good approach for initial debug
    //.post(() => {console.log('get all employees')})             // Good approach for initial debug
    .get(getAllEmployees)              // get all employees
    .post(createEmployee)              // create a new employee

// M4 Lecture 1:  Temporarily comment out all routes except for the 'getAllEmployees' route above    
router.route('/api/employees/:id')              
    .get(getEmployee)                  // get a specific employee by id   // M6 Lecture 7:  exposed route for 'EmployeeEdit' component
    .patch(updateEmployee)             // update a spcific employee by id // M6 Lecture 8:  exposed route for 'EmployeeEdit' component
    .delete(deleteEmployee)            // delete a specific employee by id
    
export default router
