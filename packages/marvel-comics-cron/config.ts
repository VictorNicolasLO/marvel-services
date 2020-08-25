import assert from "assert";
require("dotenv").config();
const getEnv = (name: string) => {
  const envVar = process.env[name]
  assert(envVar, `${name} ENV not found`);
  return envVar
};


export const MARVEL_PRIVATE_KEY = getEnv("MARVEL_PRIVATE_KEY")
export const MARVEL_PUBLIC_KEY = getEnv("MARVEL_PUBLIC_KEY")
export const MARVEL_BASE_URL = getEnv("MARVEL_BASE_URL")
