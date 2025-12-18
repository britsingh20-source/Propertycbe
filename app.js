document.addEventListener("DOMContentLoaded", () => {

  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSg9ZAVRPCVLcnBR3SkQceLLy4Gi9HExe86hrDuYv-imSSsjspq0VI6XO6ki0RwHveAjc2dM6VHQpm3/pub?output=csv";

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];

      if (char === '"' && inQuotes && next === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(current);
        current = "";
      } else if (char === "\n" && !inQuotes) {
        row.push(current);
        rows.push(row);
        row = [];
        current = "";
      } else {
        current += char;
      }
    }
    row.push(current);
    rows.push(row);
    return rows;
  }

  fetch(CSV_URL)
    .then(res => res.text())
    .then(text => {
      const data = parseCSV(text);
      const rows = data.slice(1); // remove header
      const container = document.getElementById("properties");

      if (!container) {
        console.error("❌ #properties div not found");
        return;
      }

      container.innerHTML = "";

      rows.forEach(cols => {
        if (!cols[1]) return;

        const title = cols[1];
        const location = cols[2];
        const price = cols[3];
        const description = cols[4];
        const features = cols[5];

        const images = cols.slice(6, 12).filter(Boolean);
        const mainImage = images[0] || "";

        container.innerHTML += `
          <div class="card">
            ${mainImage ? `<img src="${mainImage}" alt="${title}">` : ""}
            <div class="card-body">
              <h3>${title}</h3>
              <p><strong>Location:</strong> ${location}</p>
              <p class="price">₹ ${price}</p>
              <p>${description}</p>
              <p><strong>Features:</strong> ${features}</p>

              <a class="btn whatsapp"
                 href="https://wa.me/918111024877?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(title)}"
                 target="_blank">
                 Enquire on WhatsApp
              </a>
            </div>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("❌ CSV Load Error:", err);
      const container = document.getElementById("properties");
      if (container) {
        container.innerHTML =
          "<p style='padding:20px'>Unable to load properties</p>";
      }
    });

});

