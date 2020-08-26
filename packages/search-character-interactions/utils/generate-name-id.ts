export function generateNameId(name: string) {
  return name.toLowerCase().split(" ").join("-");
}
