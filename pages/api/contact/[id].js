'use strict';

import { getClient } from '../../../lib/fm-connect';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await getClient();
  if (req.method === 'GET') {
    const result = await client.get('ContactsWEB', id);
    res.status(200).json(result);
  } else if (req.method === 'PUT') {
    const id = parseInt(req.query.id);
    const data = req.body;
    const result = await client.edit('ContactsWEB', id, data);
    res.status(200).json(result);
  } else {
    res.status(500).json({ message: 'Method not supported' });
  }
}
