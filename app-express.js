
const express = require('express');
const app = express();
const fs = require('fs');
const _ = require('lodash');

const data = fs.readFileSync('./files/animals.json', 'utf-8');
colors = JSON.parse(data);


app.get("/", (req, res) => {

res.send('testing con express')
});

app.get('/color', (req, res) => {
    const colorAleatorio = _.sample(colors);
    const colorBuscado = req.query.variant?.toLowerCase();

    if (colorBuscado) {
        const colorEncontrado = _.find(colors, c => c.variant.toLowerCase() === colorBuscado);

        if (colorEncontrado) {
            res.send(`<html> <body style="color: ${colorEncontrado.hex};">
                <h1>${colorEncontrado.variant}</h1><p>Hex: ${colorEncontrado.hex}</p>
                <p>${colorEncontrado.animalName}</p>
                ${colorEncontrado.urlImage ? `<img src="${colorEncontrado.urlImage}" alt="${colorEncontrado.variant}" width="250"/>` : ''}
                </body></html>`);
        } else {
            res.send(`El color "${colorBuscado}" NO está en la base de datos.`);
        }
    } else {
        res.send(`<html> <body style="color: ${colorAleatorio.hex};">
            <h1>${colorAleatorio.variant}</h1><p>Hex: ${colorAleatorio.hex}</p>
            <p>${colorAleatorio.animalName}</p>
            ${colorAleatorio.urlImage ? `<img src="${colorAleatorio.urlImage}" alt="${colorAleatorio.variant}" width="250"/>` : ''}
            </body></html>`);
    }
});

app.get('/get-colors', (req, res) => { 
const htmlList = colors.map(c =>`<tr>
         <td><a href="/color?variant=${encodeURIComponent(c.variant)}">${c.variant}</a></td>
       <td>${c.hex}</td>
       <td style="background-color: ${c.hex}; width: 50px;"></td>
             </tr>`
    ).join('');

    res.send(`
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

}); 
   
app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`);
});