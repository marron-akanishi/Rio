import { JSDOM } from 'jsdom';

/**
 * HTMLの文字コードをメタ情報から判定する
 */
export const detectCharset = (buffer: ArrayBuffer): 'sjis' | 'eucjp' | 'utf8' => {
  const html = Buffer.from(buffer).toString('utf-8');
  const dom = new JSDOM(html);
  const meta = dom.window.document.querySelector('meta[http-equiv="content-type"]');
  if (meta === null) return 'utf8';

  const contentType = (meta as HTMLMetaElement).content;
  const charset = contentType.split('charset=')[1];
  switch (charset) {
    case 'Shift_JIS':
      return 'sjis';
    case 'EUC-JP':
      return 'eucjp';
    default:
      return 'utf8';
  };
}
