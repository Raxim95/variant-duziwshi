const input = document.getElementById("fileInput");

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) {
    showToast("Hesh qanday fayl tańlanbadı");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    kategoriyalar = JSON.parse(e.target.result);
    fill_tabs(kategoriyalar);
    return;
  };
  reader.onerror = function () {
    showToast("Fayldı oqıwdıń ilaji bolmadı");
  };

  reader.readAsText(file);
});
