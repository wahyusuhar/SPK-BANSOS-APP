import { build } from "vite";
import path from "path";
import fs from "fs";

// Pastikan output folder dist ada
const outDir = path.resolve(process.cwd(), "dist/public");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Build client Vite
await build({
  configFile: "./vite.config.ts",
});

console.log("Client build complete!");
