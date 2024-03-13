import { Memo } from "../models/memo";

export const create = async (req: any, res: any) => {
  try {
    // すでに登録済みのメモの数を取得する（ポジションに利用する）
    const memoCount = await Memo.find().countDocuments();
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};
