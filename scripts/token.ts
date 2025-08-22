import { randomBytes } from "node:crypto";

const token = randomBytes(64).toString("base64");

console.log(token);
