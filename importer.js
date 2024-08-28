import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

// Chemin du fichier CSV d'entrée
const inputCsvFile = 'tarifs.csv';

// Répertoire de sortie pour les fichiers Markdown
const outputDir = 'content/catalogue';

// Créer le répertoire de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// vider les fichiers Markdown existants
function emptyMarkdownFiles() {
    const files = fs.readdirSync(outputDir);
    for (const file of files) {
        if (file.endsWith('.md')) {
            fs.unlinkSync(path.join(outputDir, file));
        }
    }
}

emptyMarkdownFiles();   

function createProductContent(row) {
    let productContent = `## ${row['CATEGORIE']} ${row['INT/EXT']} ${row['CODE FOURNISSEUR']} ${row['CODE COLLECTION']} ${row['DIMENSION2']} ${row['COULEUR']} ${row['FOURNISSEUR']}

${row['IMAGE']}
`;
    return productContent;
}

function createMarkdownFile(productFilename, productContent) {
    const markdownFileName = `${outputDir}/${productFilename}`;
    fs.writeFile(markdownFileName, productContent, (err) => {
        if (err) {
            console.error(`Erreur lors de l'écriture du fichier ${markdownFileName} :`, err);
        } else {
            console.log(`Fichier ${markdownFileName} créé avec succès.`);
        }
    });
}

let rowIndex = 0;

const csvStream = fs.createReadStream(inputCsvFile, { encoding: 'utf8' })
    .pipe(csv.parse({ delimiter: ';', headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        let productFilename = row['CATEGORIE'].toLowerCase().replace(/ /g, '') + '-'
        + row['INT/EXT'].toLowerCase().replace(/ /g, '') + '-'
        + row['CODE FOURNISSEUR'].toLowerCase().replace(/ /g, '') + '-'
        + row['CODE COLLECTION'].toLowerCase().replace(/ /g, '') + '-'
        + row['DIMENSION2'].toLowerCase().replace(/ /g, '') + '-'
        + row['COULEUR'].toLowerCase().replace(/'/g, '').replace(/ /g, '') + '-'
        + row['FOURNISSEUR'].toLowerCase().replace(/'/g, '').replace(/ /g, '')
        + '.md';

        // createMarkdownFile(productFilename, createProductContent(row));

        rowIndex++;
    })
    .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));

