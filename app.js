import express from 'express'
import {} from 'dotenv/config'
import routes from './routes/routes.js'

// ORIGINAL CODE
//import {} from './db/connect.js'

// REFACTORED CODE (so import now uses the 'connectDB' function from './db/connect.js')
import connectDB from './db/connect.js'

// In order to use the body-parser middleware with our app, we need to first import it in our "apps.js" file
import bodyParser from 'body-parser'

// M5 Lecture 7:  Added in support of BROWSER HISTORY ROUTING
import path from 'path'

const app = express()

// M4 Lecture 1:  Specifically set the 'public' folder as the 'static folder'
app.use(express.static('public'))

// M4 Lecture 3:  Added in support of adding a new employee (via Post Submissions from our form) into the MongoDB database
app.use(bodyParser.urlencoded({ extended: false }))

// IMPORTANT:  We must setup the 'bodyParser.json()' middleware BEFORE our routes (otherwise, it won't work)
app.use(bodyParser.json())

// LOAD ROUTES INTO OUR MAIN FILE
// M4 Lecture 1:  Replace COMP 692 path with root of our web api '/' for 'index.html' 
//                and any special routes, other than the root, should read from our 'routes' folder
//app.use('/api/v1/employees', routes)
app.use('/', routes)

// M5 Lecture 7:  Added the following lines of code in support of BROWSER HISTORY ROUTING
app.get('*', (req, res) => {
	res.sendFile(path.resolve('public/index.html'))
})

const PORT = process.env.PORT || 5000

// ORIGINAL CODE
//app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

// REFACTORED CODE (using an 'init' asynchroous function which supports await and a try/catch block)
const init = async () => {
    try {
        await connectDB(process.env.DB)
        console.log('Connected to the database...')
        app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
    } catch {
        console.log(`ERROR: ${err}`)
    }
}
init()
