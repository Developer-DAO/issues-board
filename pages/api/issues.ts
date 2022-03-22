import { NextApiRequest, NextApiResponse } from 'next';
import { getIssues } from '../../utils';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const issues = getIssues();
  return res.status(200).json({ issues });
};

export default handler;
