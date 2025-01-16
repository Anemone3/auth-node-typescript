import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
    default: 'https://i.pinimg.com/736x/96/83/aa/9683aaa7b396888f2f7a6df3197d2374.jpg'
},
  role: {
    type: [String],
    enum: ["admin", "user","customer"],
    default: "user",
  },
});


export const UserModel = mongoose.model("User", userSchema);