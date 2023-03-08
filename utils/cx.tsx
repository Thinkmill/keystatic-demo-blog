// ------------------------------
// Merge multiple class strings together
// ------------------------------
export function cx(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
