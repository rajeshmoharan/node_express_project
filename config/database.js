const mongoose = require('mongoose');

const connectToDb = async() => {
         mongoose.connect(process.env.MONGO_URL)
        .then((conn) => {
            console.log(`DB Connected Sucessfully ${conn.connection.host}`);
        })
        .catch((error) => {
            console.log(error);
        })
}

// const connectToDb = (async() => {
//         try {
//             await mongoose.connect(process.env.MONGO_URL);
//             console.log(`Database Connected Succesfully`);
//         } catch (error) {
//            console.log(error); 
//         }
// }) ();

module.exports = connectToDb;