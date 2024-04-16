const mongoose = require("mongoose");
// Connection URI
const url = 'mongodb+srv://snehalelkiwar22:NNC8URBOWMchWhtT@cluster0.uxptzd4.mongodb.net/Edi?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI

module.exports.connect = () => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => console.log("Error: ", error));
  };







