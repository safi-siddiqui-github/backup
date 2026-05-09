import "dotenv/config";
import { connectDB } from "./database/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 3000;

app.on("error", (error) => {
  console.error("App error", error.message);
});

// Database
connectDB()
  .then((res) => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => console.error(error.message));
