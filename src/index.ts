#!/usr/bin/env node

import fs, { readdir } from 'fs';
import ora from 'ora';
import chalk from 'chalk';

import { bytesConverter } from './utils/bytesConverter';
import { 
  defaultSoundSettings,
  ManifestData,
  SeparateSounds,
  Sounds
} from './models/manifest';
import { awaiter } from './utils/awaiter';

const greenText = chalk.green;
const blueBg = chalk.bgBlue.black;
const magenta = chalk.magenta;
const gon = chalk.gray;

const smallFiles: string[] = [];
const bigFiles: string[] = [];
const soundFiles: string[] = [];


readdir(process.cwd(), async (err, files) => {
  if (err) {
    console.error(err);
  }
  else {

    const spinner = ora({
      color: 'blue',
      spinner: 'dots3'
    });
    spinner.start('Reading files');
    await awaiter(2000);
    spinner.succeed(`${ magenta(`${files.length}`) } sound files found`);
    spinner.start('Creating manifest file...');

    files.forEach(file => {
      const stats = fs.statSync(file);
      const fileSizeInBytes = stats.size;
      const fileSizeInMegaBytes = bytesConverter(fileSizeInBytes);

      if (fileSizeInMegaBytes > 1.0) {
        bigFiles.push(file);
        return;
      }

      smallFiles.push(file);
      // soundFiles.push(file);
    });

    const manifestData: ManifestData = {} as ManifestData;
    manifestData.Sounds = {} as Sounds;
    manifestData.Sounds.path = {};
    manifestData.separateSounds = {};//

    // soundFiles.forEach(soundFile => {
    //   if (soundFile.includes('.wav')) {
    //     const fileName = soundFile.split('.')[0];
    //     soundsData.Sounds.path[fileName] = soundFile;
    //   }
    // });

    smallFiles.forEach(smallFile => {
      if (smallFile.includes('.wav')) {
        const fileName = smallFile.split('.')[0];
        manifestData.Sounds.path[fileName] = smallFile;
      }
    });

    bigFiles.forEach(bigFile => {
      if (bigFile.includes('.wav')) {
        const fileName = bigFile.split('.')[0];
        const separateSound: SeparateSounds = {
          path: bigFile,
          ...defaultSoundSettings
        };
        if (manifestData.separateSounds) {
          // manifestData.separateSounds[fileName] = separateSound;
          manifestData.separateSounds[`Sounds.${fileName}`] = separateSound;
        }
      }
    });

    // const manifest = {
    //   ...soundsData,
    //   silencePadding: 0.4,
    //   ...defaultSoundSettings,
    // };

    // Object.keys(manifestData.separateSounds).forEach(key => {
    //   if (manifestData.separateSounds) {
    //     (newObject as any)[key] = manifestData.separateSounds[key];
    //   }
    // });

    fs.writeFileSync('manifest.json', JSON.stringify({
      Sounds: {
        ...manifestData.Sounds,
        silencePadding: 0.4,
        ...defaultSoundSettings
      },
      ...manifestData.separateSounds
    }));
    // fs.writeFileSync('manifest.json', JSON.stringify({
    //   Sounds: {
    //     ...manifest.Sounds,
    //     silencePadding: 0.4,
    //     ...defaultSoundSettings
    //   }
    // }));

    await awaiter(2000);
    spinner.succeed(chalk.green(`Manifest file created successfully`));

    console.log();
    console.log(`${ blueBg(` All done! `) } Have a great day! 😉`);
  }
});