import mongoose from "mongoose"

let isConnected = false;

export const connectToDB = async () => {
    const DBURL = "mongodb+srv://seeni:seeni123@cluster0.gzbyzib.mongodb.net/?retryWrites=true&w=majority";
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("Database is already connected!");
        return
    }

    try {
        await mongoose.connect(DBURL, {
            dbName: "next-auth-app",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;
        console.log("Database connected!");
    } catch (error) {
        console.log(error);
        console.log("Failed to connect the Database!");
    }
}