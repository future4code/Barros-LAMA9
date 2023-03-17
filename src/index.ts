import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/showRouter";
import { app } from "./app";

app.use("/users", userRouter);
app.use("/band", bandRouter);
app.use("/show", showRouter);

