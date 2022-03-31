// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_ADDRESS } from '@/components/constant/backend';

type API_RESPONSE =
  | [
      {
        className: 'Organic';
        probability: number;
      },
      {
        className: 'Reusable';
        probability: number;
      }
    ]
  | {
      message: string;
    };

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<API_RESPONSE>
) => {
  if (req.method === 'POST') {
    const reqBody = req.body;
    const body = {
      buffer: reqBody.buffer as string,
      mimetype: reqBody.mimetype as string,
    };
    const response = await axios.post<API_RESPONSE>(
      `${API_ADDRESS}/classify/buffer`,
      body
    );
    res.json(response.data);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
