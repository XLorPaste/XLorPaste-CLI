import axios from 'axios';
import { Base64 } from 'js-base64';

import { DefaultXLorPasteServer } from './config';

interface UploadOptions {
  url?: string;
  lang?: string;
}

interface UploadReturn {
  token: string;
}

interface DownloadOptions {
  url?: string;
}

interface DownloadReturn {
  token: string;
  body: string;
  lang: string;
}

export async function upload(
  code: string,
  { lang = 'text', url = DefaultXLorPasteServer }: UploadOptions
) {
  const api = axios.create({
    baseURL: url,
  });
  const { data } = await api.post('/', {
    body: Base64.encodeURI(code),
    lang,
  });
  return (data as UploadReturn).token;
}

export async function download(
  token: string,
  { url = DefaultXLorPasteServer }: DownloadOptions
) {
  const api = axios.create({
    baseURL: url,
  });
  const { data } = await api.get(`/${token}`);
  data.body = Base64.decode(data.body);
  return data as DownloadReturn;
}
