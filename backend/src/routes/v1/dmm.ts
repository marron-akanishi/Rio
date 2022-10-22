import express from 'express';
import type { DmmItemList } from '../../models/dmm';

const router = express.Router();
const DMM_API_URL = 'https://api.dmm.com/affiliate/v3/ItemList';

interface GetProductsRequest extends express.Request {
  query: {
    cid: string | undefined
    keyword: string | undefined
  }
}

/**
 * DMM商品情報取得API
 */
router.get('/products', async (req: GetProductsRequest, res: express.Response) => {
  try {
    if (!req.query.cid && !req.query.keyword) throw new Error("パラメータの指定がありません");
    if (!process.env.DMM_API_KEY || !process.env.DMM_AFFILIATE_ID) throw new Error("DMM APIの設定がされていません");

    const params = {
      api_id: process.env.DMM_API_KEY,
      affiliate_id: process.env.DMM_AFFILIATE_ID,
      site: 'FANZA',
      service: 'pcgame',
      floor: 'digital_pcgame',
      hits: '100',
      sort: 'date',
      cid: req.query.cid || "",
      keyword: req.query.keyword || "",
      output: 'json',
    };
    const query = new URLSearchParams(params);

    const resp = await (await fetch(`${DMM_API_URL}?${query}`)).json() as DmmItemList;
    if (resp.result.status !== 200) throw new Error("APIの呼び出しに失敗しました");

    const data = {
      total: resp.result.total_count,
      items: resp.result.items.map((item) => ({
        content_id: item.content_id,
        title: item.title,
        dmm_url: item.URL,
        image_url: item.imageURL.large,
        thumbnail_url: item.imageURL.small,
        date: item.date.split(" ")[0],
        maker: item.iteminfo.maker,
        author: item.iteminfo.author,
      })),
    };

    res.status(200).json(data);
  } catch (e: any) {
    res.status(400).json({ detail: e.message });
  }
});

export default router;