const express = require("express");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoutes")
connectDB();

app.use(express.json()); // middleware za parsiranje JSON podataka
app.use(express.urlencoded({ extended: true })); // middleware za parsiranje URL kodiranih podataka
// Dodajemo authRouter za rute
app.use("/api/user", authRouter);

app.listen(PORT, () => {
    console.log(`server is running at port:${PORT}`)
})
