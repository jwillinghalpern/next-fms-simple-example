'use strict';

import { getClient } from '../../../lib/fm-connect';

export default async function handler(req, res) {
  let parameters = req.query;
  const asList = parameters.asList === 'true' || parameters.asList === '1';
  delete parameters.asList;
  const layout = asList ? 'ContactsWEBList' : 'ContactsWEB';
  const client = await getClient();
  if (req.method === 'GET') {
    const result = await client.list(layout, parameters);
    res.status(200);
    res.json(result);
  } else if (req.method === 'POST') {
    const result = await client.create('ContactsWEB', req.body, {
      script: 'DAPI_LOG',
    });
    res.status(200);
    res.json(result);
  } else {
    res.status(500);
    res.json({ message: 'Method not supported' });
  }
}
