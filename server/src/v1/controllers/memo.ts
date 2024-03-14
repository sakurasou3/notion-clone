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

export const getAll = async (req: any, res: any) => {
  try {
    // sort: positionの降順でソート
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json(err);
  }
};
