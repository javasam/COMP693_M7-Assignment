import mongoose from 'mongoose'

// ORIGINAL CODE
// const EmployeesSchema = new mongoose.Schema({
// 	name: String,
// 	extension: Number,
// 	email: String,
// 	title: String,
// 	dateHired: { type: Date, default: Date.now },
// 	//currentlyEmployed: Boolean
// 	currentlyEmployed: { type: Boolean, default: true }
// })

// REFACTORED CODE (to add Mongoose Validation)
const EmployeesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name required']
	},
	extension: {
		type: Number,
		required: [true, 'Extension required']
	},
	email: {
		type: String,
		required: [true, 'Email required']
	},
	title: {
		type: String,
		required: [true, 'Title required']
	},
	dateHired: { 
		type: Date, 
		default: Date.now 
	},
	currentlyEmployed: {
		type: Boolean,
		default: true
	}
})

// ORIGINAL CODE
//export default EmployeesSchema

// REFACTORED CODE
export default mongoose.model('Employee', EmployeesSchema)
