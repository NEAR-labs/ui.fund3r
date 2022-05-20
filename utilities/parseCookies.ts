import type { NextApiRequest } from 'next';
import cookie from 'cookie';

const parseCookies = (req: NextApiRequest) => {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
};

export default parseCookies;
