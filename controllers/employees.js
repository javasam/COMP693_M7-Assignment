// By importing the model (which is basically a wrapper for the schema) into our ‘/controllers/employees.js’ file, 
// we will eventually refactor all of the following code to take advantage of all the different Mongoose commands 
// to insert data into MongoDB based on our EmployeesSchema schema.
import Employee from '../models/employee.js'

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})

        // returns all employee documents in the response status
        // M4 Lecture 1:  Comment out the following line of code for this module
        //res.status(201).json({employees})

        // returns the count of all employee documents in the response status
        // M4 Lecture 1:  Uncomment out the following line of code for this module
        res.status(201).json({employees, count: employees.length})
    
        //res.send('Get all employees')
    } catch (err) {
        res.status(500).json({ msg: err })
    }    
}
const getEmployee = async (req, res) => {
    try {
        // Create an Alias... cast the id property of the req.params to be employeeId
        let {id: employeeId} = req.params

        const employee = await Employee.findOne({ _id: employeeId })

        // REFACTOR to test for employee doesn't exist by that id
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ID ${employeeId} found.`})          //404:  not found error
        }

        // returns the desired employee document in the response status
        res.status(201).json({employee})                                                             //201:  success

        //res.send('Get a single employee')
    } catch (err) {
        res.status(500).json({ msg: err })                                                           //500:  server error
    }
}

// ORIGINAL CODE
// const createEmployee = async (req, res) => {
//     const employee = await Employee.create(req.body)
//     res.status(201).json({employee})
//     //res.send('Create a new employee')
// }

// REFACTORED CODE (to use a try/catch block and output error info in the response)
const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(201).json({ employee })
    
        // res.status(201).json({ msg: 'Employee added successfully' })
        // res.send('Create a new employee')
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}
const updateEmployee = async (req, res) => {
    try {
        // Create an Alias... cast the id property of the req.params to be employeeId
        let {id: employeeId} = req.params

        const employee = await Employee.findOneAndUpdate(
            { _id: employeeId }, 
            req.body, 
            {
            new: true,                           // This returns the updated documented
            runValidators: true                  // This ensures Validation occurs using our 'employee.js' model
            }
        )

        // Test for employee doesn't exist by that id
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ID ${employeeId} found.`})        //404:  not found error
        }

        // confirms successful deletion
        res.status(200).json({ msg: 'Employee successfully updated.' })                            //200:  success

        //res.send('Update an existing employee')
    } catch (err) {
        res.status(500).json({ msg: err })                                                         //500:  server error
    }    
}
const deleteEmployee = async (req, res) => {
    try {
        // Create an Alias... cast the id property of the req.params to be employeeId
        let {id: employeeId} = req.params

        const employee = await Employee.findOneAndDelete({ _id: employeeId })

        // REFACTOR to test for employee doesn't exist by that id
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ID ${employeeId} found.`})        //404:  not found error
        }

        // confirms successful deletion
        res.status(201).json({ msg: 'Employee successfully deleted.' })                                                             //201:  success

        //res.send('Delete an employee')
    } catch (err) {
        res.status(500).json({ msg: err })                                                           //500:  server error
    }
}
export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}
