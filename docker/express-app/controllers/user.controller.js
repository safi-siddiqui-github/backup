import { UserModel } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password, gender } = req.body;

  const mustFields = {
    firstname,
    lastname,
    username,
    email,
    password,
    gender,
  };

  // const { avatar, cover } = req.files;

  // const mustFiles = {
  //   avatar,
  //   cover,
  // };

  // console.log(mustFields.some((field) => field?.trim() == "" || !field));
  for (const [key, value] of Object.entries(mustFields)) {
    // console.log(`${key}:${value}`);
    if (!value?.trim()) {
      throw new ApiError(400, `${key} is required.`);
    }
  }

  const exist = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (exist) {
    throw new ApiError(409, `User already exist.`);
  }

  console.log(req.file);
  // for (const [key, value] of Object.entries(req.files)) {
  //   console.log(`${key}:${value}`);
  // }
  
  
  // avatarPath = req.files?.avatar[0]?.path;
  // coverPath = req.files?.cover[0]?.path;


  return res.status(200).json({
    message: "User registered",
  });
});

// app.get("/", async (req, res) => {
//   // await user.deleteMany()

//   res.send("<h1>Hello World! Nodemon</h1> <p>" + JSON.stringify(b) + "</p>");
// });

// app.get("/todo", async (req, res) => {
//   // todo.create({name: 'Work Two'})
//   // const a = await todo.find()

//   res.json({ data: [] });
// });

// app.post("/todo", async (req, res) => {
//   // console.log(req.body.todo);
//   // await todo.create({name: req.body.todo})
//   res.json({ msg: "Todo Added" });
// });

// app.delete("/todo", async (req, res) => {
//   console.log(req.body.todo);
//   res.json({ msg: "Todo Deleted" });
// });
