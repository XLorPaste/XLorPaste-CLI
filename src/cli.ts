#!/usr/bin/env node

import cac from 'cac';
import { readFileSync, promises } from 'fs';
import path from 'path';

import { ext2Lang } from './utils';
import { upload, download } from './xlorpaste';
import { DefaultXLorPasteServer } from './config';

const cli = cac('xlorpaste');

interface CliOptions {
  language?: string;
  server?: string;
}

cli
  .command('<token> [filename]', 'Download <token> to [filename] or stdout')
  .option('-l, --lang, --language <language>', 'Language')
  .option('--server <server>', 'Server Url')
  .action(
    async (token: string, filename?: string, { server }: CliOptions = {}) => {
      const url = server || DefaultXLorPasteServer;
      const { body } = await download(token, { url });

      if (filename) {
        await promises.writeFile(filename, body, 'utf-8');
      } else {
        console.log(body);
      }
    }
  );

cli
  .command('up [filename]', 'Upload [filename] or upload stdin (text)')
  .option('-l, --lang, --language <language>', 'Language')
  .option('--server <server>', 'Server Url')
  .action(async (filename?: string, { language, server }: CliOptions = {}) => {
    const body: string = await (filename
      ? promises.readFile(filename, 'utf-8')
      : new Promise((res, rej) => {
          const code: string[] = [];
          process.stdin.on('data', (data) => {
            code.push(data.toString('utf-8'));
          });
          process.stdin.on('end', () => {
            res(code.join(''));
          });
          process.stdin.on('error', (err) => {
            rej(err);
          });
        }));

    const lang = language ? language : ext2Lang(filename);

    const url = server || DefaultXLorPasteServer;

    const token = await upload(body, { lang, url });

    console.log('Upload Success!');
    console.log(`Your token is "${token}".`);
    console.log(`Your url is https://xlorpaste.cn/${token}.`);
  });

cli.help();

cli.version(
  JSON.parse(readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))
    .version
);

cli.parse();
