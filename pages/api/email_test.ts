import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '../../src/func/email'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const info = await sendEmail('badpirate@gmail.com', 'Test Email', 'Test Body')
  res.json(info)
}
