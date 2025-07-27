import Jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
export const checkUser = (token: string) => {
  const decode = Jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (!decode) {
    return null;
  }
  return decode.id;
};
