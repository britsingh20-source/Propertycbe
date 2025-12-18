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

  // 🔧 CLEAN URL (THIS IS THE KEY FIX)
  function cleanUrl(url) {
    if (!url) return "";
    return url
      .trim()
      .replace(/^"+|"+$/g, "")   // remove quotes
      .replace(/\s/g, "");       // remove spaces
  }

  fetch(CSV_URL)
    .then(res => res.text())
    .then(text => {
      const rows = parseCSV(text).slice(1);
      const container = document.getElementById("properties");
      container.innerHTML = "";

      rows.forEach(cols => {
        if (!cols[1]) return;

        const title = cols[1];
        const location = cols[2];
        const price = cols[3];
        const description = cols[4];
        const features = cols[5];

        // 👇 THIS LINE FIXES YOUR IMAGE ISSUE
        const images = cols.slice(6, 12).map(cleanUrl).filter(Boolean);
        const mainImage = "https://raw.githubusercontent.com/github/explore/main/topics/html/html.png";

        container.innerHTML += `
          <div class="card">
            ${mainImage ? `<img src="${mainImage}" alt="${title}" loading="lazy">` : ""}
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
      console.error(err);
      document.getElementById("properties").innerHTML =
        "<p>Unable to load properties</p>";
    });

});
