import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { Admin } from "./models/adminSchema.js";

// Define your schema and model here
const schemaData = mongoose.Schema(
  {
    name: String,
    father:String,
    age:String,
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


// app.put('/updateinfo/:id', async (req, res) => {
//   const { id } = req.params;
//   if (!isValidObjectId(id)) {
//     return res.status(400).send({ error: 'Invalid ID format' });
//   }

//   try {
//     const updatedData = await userModel.findByIdAndUpdate(id, req.body, { new: true });
//     res.send({ success: true, message: "data updated successfully", data: updatedData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Admin.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("incorrect password");
      }
    } else {
      res.json("no record existed");
    }
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













// import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
// import mongoose from "mongoose";
// import cors from "cors";
// import { Admin } from "./models/adminSchema.js";
// //import { userModel } from "./models/studentSchema.js";

// //import bodyParser from "body-parser";

// const app = express();
// app.use(express.json());
// //app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//   })
// );

// //schema
// const schemaData = mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     mobile: String,
//   },
//   {
//     Timestamp: true,
//   }
// );

// const userModel = mongoose.model("students", schemaData);

// //read

// // app.get("/getinfo", async (req, res) => {
// //   const data = await userModel.find({});
// //   res.json({ success: true, data: data });
// // });

// app.get('/getinfo', async (req, res) => {
//   try {
//     const students = await userModel.find(); // Assuming `userModel` is your Mongoose model
//     res.status(200).json({ success: true, data: students });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });


// app.post("/createinfo", async (req, res) => {
//   console.log(res.body);
//   const data = new userModel(req.body);
//   await data.save();
//   res.send({ success: true, message: "data saved successfully", data: data });
// });

// // app.put("/updateinfo", async (req, res) => {
// //   console.log(req.body);
// //   const { _id, ...rest } = req.body;

// //   const data = await userModel.updateOne({ _id: _id }, rest);
// //   res.send({
// //     success: true,
// //     message: "data is updated successfully",
// //     data: data,
// //   });
// // });


// // Example function to validate ObjectId
// function isValidObjectId(id) {
//   return mongoose.Types.ObjectId.isValid(id);
// }

// // Example usage in an API route
// app.put('/updateinfo/:id', async (req, res) => {
//   const { id } = req.params;
//   if (!isValidObjectId(id)) {
//     return res.status(400).send({ error: 'Invalid ID format' });
//   }

//   // Proceed with update operation
// });

// const newDoc = new Model({ name: "Test" }); // Mongoose will handle _id automatically
// await newDoc.save();


// app.delete("/deleteinfo/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   const data = await userModel.deleteOne({ _id: id });
//   res.send({
//     success: true,
//     message: "data is deleted successfully",
//     data: data,
//   });
// });

// app.get("/", (req, res) => {
//   return res.status(200).send("welcome to mern stack");
// });

// app.post("/register", (req, res) => {
//   Admin.create(req.body)
//     .then((Admin) => res.json(Admin))
//     .catch((err) => res.json(err));
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   Admin.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("success");
//       } else {
//         res.json("incoorect password");
//       }
//     } else {
//       res.json("no record existed");
//     }
//   });
// });

// // app.use('/auth',AuthRoutes);

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log("App connected to database");
//     app.listen(PORT, () => {
//       console.log(`server is running... at ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
