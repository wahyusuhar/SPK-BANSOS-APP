import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from "../server/index";

// Handler untuk menjalankan Express sebagai serverless function
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Express menerima req dan res langsung
  return app(req, res);
}
