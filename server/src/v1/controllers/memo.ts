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

export const getOne = async (req: any, res: any) => {
  try {
    const memo = await Memo.findOne({
      user: req.user._id,
      _id: req.params.memoId,
    });
    if (!memo) return res.status(404).json({ error: "メモが存在しません" });
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const update = async (req: any, res: any) => {
  const { memoId } = req.params;
  const { title, description } = req.body;
  try {
    // 空欄の場合はdefault値で置き換え
    if (title === "") req.body.title = "無題";
    if (description === "")
      req.body.description = "ここに自由に記入してください。";

    const memo = await Memo.findOne({
      user: req.user._id,
      _id: memoId,
    });
    if (!memo) return res.status(404).json({ error: "メモが存在しません" });

    const updatedMemo = await Memo.findByIdAndUpdate(
      memoId,
      {
        $set: req.body,
      },
      { new: true } // これがないと更新後の情報を返してくれない
    );

    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteMemo = async (req: any, res: any) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({
      user: req.user._id,
      _id: memoId,
    });
    if (!memo) return res.status(404).json({ error: "メモが存在しません" });

    await Memo.findByIdAndDelete(memoId);

    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json(err);
  }
};
