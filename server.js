import app from "./app.js";
import mongoose from "mongoose";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`Database connected on port: ${PORT}`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
