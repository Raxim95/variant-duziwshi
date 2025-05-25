import db from "../db";

export default function add_category(name) {
  const name = name.trim();

  if (name === "") {
    showToast("Kategoriyanıń atın kiritiń!");
    return;
  }

  // Jaña kategoriya qosamız
  db.kategoriyalar.push({
    name: name,
    sorawlar: []
  });

  // Tabsqa qosamız
  fill_tabs(db.kategoriyalar);

  // Jaña kategoriya avtomatikti toqtatıp qoyamız
  show_category(null);
}
