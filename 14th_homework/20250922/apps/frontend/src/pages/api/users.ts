import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const count = req.query.count || 10;
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: `API 호출 실패: ${response.status}` });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "서버 에러" });
  }
}