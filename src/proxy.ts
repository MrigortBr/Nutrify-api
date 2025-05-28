import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 8080;

// Middleware CORS (caso esteja acessando de fora, como pelo ngrok)
app.use(cors());

// Proxy para redirecionar requisições /api para o backend (porta 2000)
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:2000", // seu backend local
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // remove o /api para evitar /api/api no backend
    },
  }),
);

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:3000", // seu backend local
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // remove o /api para evitar /api/api no backend
    },
  }),
);

// Servir frontend (opcional - se quiser servir HTML/JS)
app.use(express.static(path.join(__dirname, "public"))); // ajuste se necessário

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
