import Dexie from "dexie";

// indexedDBに保存するデータの型を定義。TypeSctipt側の設定
export interface MemoRecord { 
	datetime: string
	title: string
	text: string
}

const database = new Dexie('markdown-editor') // Dexieのインスタンスを生成
database.version(1).stores({ memos:'&datetime'}) // テーブル定義
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()
  await memos.put({ datetime, title, text })
}