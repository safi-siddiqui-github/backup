import { Decimal } from "decimal.js";

export function LibDecimalJSHelper(number: number | string): Decimal {
  if (!number) return new Decimal(0);
  return new Decimal(number);
}
