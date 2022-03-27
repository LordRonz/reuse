// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import formidable, { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_ADDRESS } from '@/components/constant/backend';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

type ImagePayload = {
  filepath: string;
  mimetype: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<API_RESPONSE>
) => {
  if (req.method === 'POST') {
    const data = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    const img = data.files.image as unknown as ImagePayload;
    const contents = await fs.readFile(img.filepath);
    const body = {
      buffer: contents.toString('base64'),
      mimetype: img.mimetype,
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
