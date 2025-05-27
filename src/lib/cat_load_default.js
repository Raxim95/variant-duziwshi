import db from "./db.js";
import kategoriyalar from "./kategoriyalar-data.json";

export default async function cat_load_default() {
  // eger kategoriyalar bazada bar bolsa, hesh nárse qospa
  const count = await db.kategoriyalar.count();
  if (count > 0) return;

  await db.kategoriyalar.bulkAdd(kategoriyalar);
  return kategoriyalar;
}
