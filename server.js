import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import jsonServer from "json-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Servir front compilado (dist)
app.use(express.static(path.join(__dirname, "dist")));

// JSON-server en /api
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use("/api", middlewares, router);

// Ruta SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
