import mongoose from 'mongoose'

// ORIGINAL CODE
// mongoose
//     .connect(process.env.DB)
//     .then(() => console.log('Connected to the database...'))
//     .catch((err) => console.log(err))

// REFACTORED CODE (creating const 'connectDB' arrow function)
const connectDB = (url) => {
    return mongoose.connect(url)
}
// Export function connectDB so it can be used in 'app.js'
export default connectDB
