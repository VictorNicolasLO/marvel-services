import assert from "assert";
require("dotenv").config();
const getEnv = (name: string) => {
  const envVar = process.env[name];
  assert(envVar, `${name} ENV not found`);
  return envVar;
};
