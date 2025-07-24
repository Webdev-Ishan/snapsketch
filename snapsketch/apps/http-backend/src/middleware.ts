import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Typically "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // You can attach decoded info to request object if needed:
    // req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
}
