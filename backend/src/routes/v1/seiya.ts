import express from 'express';
import { JSDOM } from 'jsdom';
import iconv from 'iconv-lite';

const router = express.Router();
const SEIYA_LIST_URL = "https://seiya-saiga.com/game/kouryaku.html";
const SEIYA_DOMAIN = "seiya-saiga.com";

interface GetProductsRequest extends express.Request {
  query: {
    title: string | undefined
  }
}

/**
 * 誠也の部屋一覧取得API
 */
router.get('/products', async (req: GetProductsRequest, res: express.Response) => {
  try {
    if (!req.query.title) throw new Error("パラメータの指定がありません");

    const resp = await (await fetch(SEIYA_LIST_URL)).arrayBuffer();
    const body = iconv.decode(Buffer.from(resp), 'sjis');
    const dom = new JSDOM(body);
    
    const list = Array.from(dom.window.document.querySelectorAll('tr > td > b > a')) as HTMLAnchorElement[];
    const items = list.filter((item) => (
      item.textContent?.includes(req.query.title!)
    )).map((item) => ({
      title: item.textContent,
      url: item.href,
    }));

    res.status(200).json({
      total: items.length,
      items: items.splice(0, 100),
    });
  } catch (e: any) {
    res.status(400).json({ detail: e.message });
  }
});

export default router;