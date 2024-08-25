import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { Admin } from "./models/adminSchema.js";

// require("dotenv").config
// const PORT=process.env.PORT;
// const connection = mongoose.connect(process.env.mongoDBURL)
// Define your schema and model here
const schemaData = mongoose.Schema(
  {
    name: String,
    father:String,
    age:String,
    gender:String,
    class:String,
    email: String,
    mobile: String,
    aadhar:String,
    address:String,
    fees:String,
    due:String,
    addmission:String,
    pincode:String,
    date:String,
    mode:String,
    english: String,
    hindi: String,
    mathematics: String,
    science: String,
    roll:Number,
    per:String,
    yellow:{type:String,
      requires:true
    },
    marks:{type:String,
      requires:true
    },
  
  },
  {
    timestamps: true, // Correct option name is 'timestamps', not 'Timestamp'
  }
);

const userModel = mongoose.model("students", schemaData);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Routes
app.get('/getinfo', async (req, res) => {
  try {
    const students = await userModel.find(); // Assuming `userModel` is your Mongoose model
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get("/getinfo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const student = await userModel.findById(id); // Use userModel to find by ID
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    console.log("Student is available");
    return res.status(200).json({ success: true, data: student });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/studentcount", async (req, res) => {
  try {
    const student  = await userModel.countDocuments(); // Count the number of documents in the Admin collection
    res.json({ count: student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






app.post("/createinfo", async (req, res) => {
  try {
    const { _id, ...data } = req.body; // Exclude _id from data
    const newData = new userModel(data);
    await newData.save();
    res.send({ success: true, message: "data saved successfully", data: newData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



app.put('/updateinfo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedData = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).send({ success: false, message: 'Data not found' });
    }
    res.send({ success: true, message: "Data updated successfully", data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.delete("/deleteinfo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await userModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "data is deleted successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// app.get("/", (req, res) => {
//   return res.status(200).send("welcome to mern stack");
// });

app.post("/", (req, res) => {
  Admin.create(req.body)
    .then((Admin) => res.json(Admin))
    .catch((err) => res.json(err));
});

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   Admin.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("success");
//       } else {
//         res.json("incorrect password");
//       }
//     } else {
//       res.json("no record existed");
//     }
//   });
// });
// Create an endpoint to track successful logins
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Admin.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        // Update successful logins count
        user.successfulLogins += 1;
        user.save()
          .then(() => res.json("success"))
          .catch((err) => res.json(err));
      } else {
        res.json("incorrect password");
      }
    } else {
      res.json("no record existed");
    }
  }).catch((err) => res.json(err));
});

app.get('/adminrecords', (req, res) => {
  Admin.find({})
    .then((admins) => {
      res.json({
        Status: true,
        Result: admins
      });
    })
    .catch((err) => {
      res.json({
        Status: false,
        Message: 'Error fetching admin records',
        Error: err
      });
    });
});


app.get("/admincount", async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments(); // Count the number of documents in the Admin collection
    res.json({ count: adminCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Route to delete an admin by ID
app.delete('/deleteadmin/:id', (req, res) => {
  const { id } = req.params;
  
  Admin.findByIdAndDelete(id)
    .then((deletedAdmin) => {
      if (deletedAdmin) {
        res.json({
          Status: true,
          Message: 'Admin deleted successfully',
          Result: deletedAdmin
        });
      } else {
        res.json({
          Status: false,
          Message: 'Admin not found'
        });
      }
    })
    .catch((err) => {
      res.json({
        Status: false,
        Message: 'Error deleting admin',
        Error: err
      });
    });
});



// Route to update an admin by ID
app.put('/updateadmin/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  Admin.findByIdAndUpdate(id, updatedData, { new: true })
    .then((updatedAdmin) => {
      if (updatedAdmin) {
        res.json({
          Status: true,
          Message: 'Admin updated successfully',
          Result: updatedAdmin
        });
      } else {
        res.json({
          Status: false,
          Message: 'Admin not found'
        });
      }
    })
    .catch((err) => {
      res.json({
        Status: false,
        Message: 'Error updating admin',
        Error: err
      });
    });
});




// Connect to MongoDB and start server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`server is running... at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
