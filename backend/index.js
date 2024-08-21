import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { Admin } from "./models/adminSchema.js";

//import bodyParser from "body-parser";

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));



//schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    Timestamp: true,
  }
);

const userModel = mongoose.model("students", schemaData);

//read

app.get("/getinfo", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

app.post("/createinfo", async (req, res) => {
  console.log(res.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data saved successfully",data:data });
});

app.put("/updateinfo",async(req,res)=>{
  console.log(req.body)
  const {_id,...rest}=req.body

  const data=await userModel.updateOne({_id:_id},rest)
  res.send({success:true,message:"data is updated successfully",data:data})
})


app.delete("/deleteinfo/:id",async(req,res)=>{
const id=req.params.id
console.log(id)
const data =await userModel.deleteOne({_id:id})
res.send({success:true,message:"data is deleted successfully",data:data})
})

app.get("/", (req, res) => {
  return res.status(200).send("welcome to mern stack");
});

app.post("/register", (req, res) => {
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
        res.json("incoorect password");
      }
    } else {
      res.json("no record existed");
    }
  });
});

// app.use('/auth',AuthRoutes);

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
