import kategoriyalar from "./kategoriyalar-data.json";
import Dexie from "dexie";
const db = new Dexie("Kategoriayalar");

// Declare tables, IDs and indexes
db.version(1).stores({
  kategoriyalar: "++id, name, sorawlar",
  sorawlar: "++id, name, count, kategoriyalarIds"
});

export default db;
