import { extname } from 'path';

export function ext2Lang(filename?: string) {
  if (filename === undefined || filename === null || filename === '') {
    return 'text';
  }
  const ext = extname(filename);
  if (ext === 'txt' || ext === 'in' || ext === 'out' || ext === 'ans') {
    return 'text';
  }
  if (ext === 'cpp' || ext === 'hpp' || ext === 'c' || ext === 'h') {
    return 'cpp';
  }
  if (ext === 'py') {
    return 'py';
  }
  if (ext === 'java') {
    return 'java';
  }
  if (ext === 'js') {
    return 'javascript';
  }
  if (ext === 'md') {
    return 'markdown';
  }
  if (ext === 'json') {
    return 'json';
  }
  return 'text';
}

export function lang2Ext(lang?: string) {
  if (lang === undefined || lang === null || lang === '') {
    return 'txt';
  }
  if (lang === 'txet') {
    return 'txt';
  }
  if (lang === 'cpp') {
    return 'cpp';
  }
  if (lang === 'py') {
    return 'py';
  }
  if (lang === 'java') {
    return 'java';
  }
  if (lang === 'javascript') {
    return 'javascript';
  }
  if (lang === 'markdown') {
    return 'md';
  }
  if (lang === 'json') {
    return 'json';
  }
  return 'txt';
}
