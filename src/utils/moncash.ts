// @ts-ignore
import moncash from 'nodejs-moncash-sdk';

import config from '../config';

moncash.configure({
  mode: config.moncashMode,
  client_id: config.moncashClient,
  client_secret: config.moncashSecret,
});

export default moncash;
