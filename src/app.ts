import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/notes";

const app = express();
app.get("/", (req, res) => { res.send("Express on Vercel"); }); const PORT = process.env.PORT || 5000; app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

app.use(express.json());

app.use("/api/notes", noteRoutes)

app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknow error occurred"
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});

export default app;