import express from "express"
import cors from 'cors'
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/showRouter";

const app = express()

app.use(express.json())
app.use("/users", userRouter);
app.use("/band", bandRouter);
app.use("/show", showRouter);

app.use(cors())

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});