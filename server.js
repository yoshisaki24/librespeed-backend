import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.raw({ limit: "200mb", type: "*/*" }));

// Download (simulate large file)
app.get("/garbage", (req, res) => {
  const size = 20 * 1024 * 1024; // 20MB
  const buffer = Buffer.alloc(size, "a");
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Length": size,
  });
  res.end(buffer);
});

// Upload (accepts large payload)
app.post("/empty", (req, res) => {
  res.send("OK");
});

app.get("/", (req, res) => {
  res.send("LibreSpeed backend is live");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
