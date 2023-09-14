import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [/^[a-zA-Z0-9]+$/, "Username is invalid"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    image: String
});

const User = models.User || model("User", UserSchema);

export default User;