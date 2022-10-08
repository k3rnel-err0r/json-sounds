#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importStar(require("fs"));
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const bytesConverter_1 = require("./utils/bytesConverter");
const manifest_1 = require("./models/manifest");
const awaiter_1 = require("./utils/awaiter");
const greenText = chalk_1.default.green;
const blueBg = chalk_1.default.bgBlue.black;
const magenta = chalk_1.default.magenta;
const gon = chalk_1.default.gray;
const smallFiles = [];
const bigFiles = [];
const soundFiles = [];
(0, fs_1.readdir)(process.cwd(), (err, files) => __awaiter(void 0, void 0, void 0, function* () {
    if (err) {
        console.error(err);
    }
    else {
        const spinner = (0, ora_1.default)({
            color: 'blue',
            spinner: 'dots3'
        });
        spinner.start('Reading files');
        yield (0, awaiter_1.awaiter)(2000);
        spinner.succeed(`${magenta(`${files.length}`)} sound files found`);
        spinner.start('Creating manifest file...');
        files.forEach(file => {
            const stats = fs_1.default.statSync(file);
            const fileSizeInBytes = stats.size;
            const fileSizeInMegaBytes = (0, bytesConverter_1.bytesConverter)(fileSizeInBytes);
            if (fileSizeInMegaBytes > 1.0) {
                bigFiles.push(file);
                return;
            }
            smallFiles.push(file);
            // soundFiles.push(file);
        });
        const manifestData = {};
        manifestData.Sounds = {};
        manifestData.Sounds.path = {};
        manifestData.separateSounds = {}; //
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
                const separateSound = Object.assign({ path: bigFile }, manifest_1.defaultSoundSettings);
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
        fs_1.default.writeFileSync('manifest.json', JSON.stringify(Object.assign({ Sounds: Object.assign(Object.assign(Object.assign({}, manifestData.Sounds), { silencePadding: 0.4 }), manifest_1.defaultSoundSettings) }, manifestData.separateSounds)));
        // fs.writeFileSync('manifest.json', JSON.stringify({
        //   Sounds: {
        //     ...manifest.Sounds,
        //     silencePadding: 0.4,
        //     ...defaultSoundSettings
        //   }
        // }));
        yield (0, awaiter_1.awaiter)(2000);
        spinner.succeed(chalk_1.default.green(`Manifest file created successfully`));
        console.log();
        console.log(`${blueBg(` All done! `)} Have a great day! 😉`);
    }
}));
