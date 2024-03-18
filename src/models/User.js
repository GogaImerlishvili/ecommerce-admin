import bcrypt from "bcrypt";
import { Schema, model,models }  from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

UserSchema.post("validate",function(user) {
  const notHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPassword,salt);
})

export const User = models?.User || model("User", UserSchema);
