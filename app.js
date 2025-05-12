
const http = require('http');
const url = require('url');
const fs = require('fs');

let colors = [];
try {
  const data = fs.readFileSync('./files/animals.json', 'utf-8');
  colors = JSON.parse(data);
} catch (err) {
  console.error('Error reading image JSON:', err);
}


const colorsList = [
  { variant: "Vermillion", hex: "#2E191B" },
  { variant: "Forest", hex: "#0B6623" },
  { variant: "Navy", hex: "#000080" },
  { variant: "Crimson", hex: "#DC143C" },
  { variant: "Sky Blue", hex: "#87CEEB" },
  { variant: "Lime", hex: "#00FF00" },
  { variant: "Gold", hex: "#FFD700" },
  { variant: "Lavender", hex: "#E6E6FA" },
  { variant: "Tangerine", hex: "#F28500" },
  { variant: "Magenta", hex: "#FF00FF" },
  { variant: "Cyan", hex: "#00FFFF" },
  { variant: "Olive", hex: "#808000" },
  { variant: "Teal", hex: "#008080" },
  { variant: "Maroon", hex: "#800000" },
  { variant: "Coral", hex: "#FF7F50" }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (pathname === '/color') {
    let color;

    if (query.variant) {
      color = colors.find(c => c.variant.toLowerCase() === query.variant.toLowerCase());
    }

    if (!color) {
      color = colors[Math.floor(Math.random() * colors.length)];
    }

    res.end(`<html> <body style="color: ${color.hex};">
            <h1>${color.variant}</h1><p>Hex: ${color.hex}</p>
            <p>${color.animalName}</p>
            ${color.urlImage ? `<img src="${color.urlImage}" alt="${color.variant}" width="250"/>` : ''}
            </body></html>`);

  } else if (pathname === '/get-colors') {
    const htmlList = colors.map(c =>
      `<tr>
         <td><a href="/color?variant=${encodeURIComponent(c.variant)}">${c.variant}</a></td>
       <td>${c.hex}</td>
       <td style="background-color: ${c.hex}; width: 50px;"></td>
             </tr>`
    ).join('');

    res.end(`
          <html>
            <body>
              <h1>Lista de colores</h1>
              <table border="1">
                <tr><th>Nombre</th><th>Hex</th><th>Color</th></tr>
                ${htmlList}
              </table>
            </body>
          </html>
        `);

  } else {
    res.end(`<h1>Bienvenidos a la base de datos de colores de NetMind!</h1>
       <p>Para obtener un color aleatorio, haz una petición GET al endpoint <code>/color</code>.</p>
        <p>Para obtener un color específico, usa <code>/color?variant=[color]</code> (por ejemplo, <code>/color?variant=Vermillion</code>).</p>
        <p>Para obtener la lista de colores, haz una petición GET al endpoint <code>/get-colors</code>.</p>
        `);
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000...');
});