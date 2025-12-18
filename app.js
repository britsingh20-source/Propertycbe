// ===============================
// GOOGLE SHEETS CSV (PUBLISHED)
// ===============================

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSg9ZAVRPCVLcnBR3SkQceLLy4Gi9HExe86hrDuYv-imSSsjspq0VI6XO6ki0RwHveAjc2dM6VHQpm3/pub?output=csv";

// ===============================
// FETCH & RENDER
// ===============================

fetch(CSV_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split("\n").slice(1);
    const container = document.getElementById("properties");
    container.innerHTML = "";

    rows.forEach(row => {
      if (!row.trim()) return;

      const cols = row.split(",");

      const id = cols[0];
      const title = cols[1];
      const location = cols[2];
      const price = cols[3];
      const description = cols[4];
      const features = cols[5];

      const images = [
        cols[6],
        cols[7],
        cols[8],
        cols[9],
        cols[10],
        cols[11]
      ].filter(Boolean);

      const viewlink = cols[12];

      if (!title) return;

      const mainImage = images[0] || "";

      container.innerHTML += `
        <div class="card">
          ${mainImage ? `<img src="${mainImage}" alt="${title}">` : ""}

          <div class="card-body">
            <h3>${title}</h3>
            <p><strong>Location:</strong> ${location}</p>
            <p class="price">₹ ${price}</p>
            <p>${description}</p>
            container.innerHTML += `
  <div class="card">
    <div class="card-body">
      <h3>${title}</h3>

      <p><strong>Location:</strong> ${location}</p>
      <p class="price">₹ ${price}</p>

      <p>${description}</p>
      <p><strong>Features:</strong> ${features}</p>

      <a class="btn whatsapp"
         href="https://wa.me/918111024877?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(title)}"
         target="_blank">
         📞 Enquire on WhatsApp
      </a>
    </div>
  </div>
`;

            <div class="actions">
              ${
                viewlink
                  ? `<a class="btn" href="${viewlink}" target="_blank">View Details</a>`
                  : ""
              }
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(err => {
    console.error("Sheet load error:", err);
    document.getElementById("properties").innerHTML =
      "<p>Unable to load properties</p>";
  });
