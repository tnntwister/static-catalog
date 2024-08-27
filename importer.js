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

let rowIndex = 0;

const csvStream = fs.createReadStream(inputCsvFile, { encoding: 'utf8' })
    .pipe(csv.parse({ delimiter: ';', headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        console.log(row['CATEGORIE'].toLowerCase().replace(/ /g, ''), row['INT/EXT'], row['CODE FOURNISSEUR'], row['CODE COLLECTION'], row['CODE COULEUR'], row['IMAGE']);
        rowIndex++;
        if (rowIndex > 2) {
            csvStream.destroy();
            return;
        }
    })
    .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));

// Traiter chaque ligne du fichier CSV
/*csvStream.on('data', (row) => {


    // Générer le contenu du fichier Markdown
    /*const markdownContent = `## ${identifiant}
    

${Categorie}

Prix : ${PrixPublic} €

![${codeFournisseur}](/${image})
`; */

    // Nom du fichier Markdown
    // const markdownFileName = `${outputDir}/${identifiant.toLowerCase().replace(/ /g, '-')}.md`;
    // console.log(markdownFileName);
/*
    // Écrire le contenu dans le fichier Markdown
    fs.writeFile(markdownFileName, markdownContent, (err) => {
        if (err) {
            console.error(`Erreur lors de l'écriture du fichier ${markdownFileName} :`, err);
        } else {
            console.log(`Fichier ${markdownFileName} créé avec succès.`);
        }
    });* /
});

csvStream.on('end', () => {
    console.log('Génération des fichiers Markdown terminée.');
}); */