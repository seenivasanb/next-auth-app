import { hashPassword } from "@/helpers/bcrypt/password";
import { connectToDB } from "@/helpers/db/connectDB";
import User from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";

const POST = async (request: NextApiRequest, response: NextApiResponse) => {

    if (request.method !== "POST")
        return response.status(405).json({ error: "Invalid Method", status: 405 });

    const { username, password } = request.body;

    if (!username || !password)
        return response.status(400).json({ error: "Username and Password are required", status: 400 });

    try {
        await connectToDB();
        const user = await User.findOne({ username: username });

        if (user) {
            return response.status(400).json({ error: "Username is already taken", status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        newUser.save();

        return response.status(201).json(newUser);
    } catch (error) {
        console.error("Server Error", error);
        return response.status(500).json({ error: error, message: "Server Error", status: 500 });
    }
};

export default POST;
