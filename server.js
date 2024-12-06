const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const PORT = process.env.PORT || 3000;
const URL = process.env.DB.replace('<db_password>', process.env.PW)


mongoose.connect(URL).then((con) => {
    //console.log(con.connections);
    console.log('Db connection successful')
}).catch(err => console.log(err))


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})


