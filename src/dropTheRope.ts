/* istanbul ignore file */
import * as minimist from 'minimist';
import * as fs from 'fs';

import * as yarle from './yarle';
import { YarleOptions } from './YarleOptions';

export const run = () => {
    const argv = minimist(process.argv.slice(2));

    const options: YarleOptions = {
        enexFile: argv['enexSource'],
        outputDir: argv['outputDir'],
        isZettelkastenNeeded: argv['zettelkasten'] || false,
        isMetadataNeeded: argv['include-metadata'] || false ,
        plainTextNotesOnly: argv['plaintext-notes-only'] || false ,
        skipLocation: argv['skip-latlng'] || false ,
        skipCreationTime: argv['skip-creation-time'] || false ,
        skipUpdateTime: argv['skip-update-time'] || false ,
        skipTags: argv['skip-tags'] || false ,
    };
    if (options.enexFile.endsWith('.enex')) {
        console.log(`Converting notes in file: ${options.enexFile}`);
        yarle.dropTheRope(options);
        console.log(`Conversion finished.`);

    } else {
        const enexDir = options.enexFile;
        const enexFiles = fs
            .readdirSync(options.enexFile)
            .filter(file => {
                return file.match(/.*\.enex/ig);
            });
        for (const enexFile of enexFiles) {
            options.enexFile = `${enexDir}/${enexFile}`;
            console.log(`Converting notes in file: ${enexFile}`);
            yarle.dropTheRope(options);
            console.log(`Conversion finished.`);

        }
    }
    process.exit();
};
run();
