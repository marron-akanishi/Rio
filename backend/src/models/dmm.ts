/**
 * DMM商品検索API レスポンス
 * 
 * 使う分だけ型定義
 */
export interface DmmItemList {
  result: {
    status: number;
    result_count: number;
    total_count: number;
    items: {
      content_id: string;
      title: string;
      URL: string;
      imageURL: {
        list: string;
        small: string;
        large: string;
      };
      date: string;
      iteminfo: {
        maker: {
          id: number;
          name: string;
        }[];
        author: {
          id: number;
          name: string;
        }[];
      };
    }[];
  };
}

/**
 * DMMメーカー検索API　レスポンス
 * 
 * 使う分だけ型定義
 */
export interface DmmMakerList {
  result: {
    status: string;
    result_count: number;
    total_count: string;
    maker: {
      maker_id: string;
      name: string;
    }[];
  };
}

/**
 * DMM作者検索API　レスポンス
 * 
 * 使う分だけ型定義
 */
 export interface DmmAuthorList {
  result: {
    status: string;
    result_count: number;
    total_count: string;
    author: {
      author_id: string;
      name: string;
    }[];
  };
}