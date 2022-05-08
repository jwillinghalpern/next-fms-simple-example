# Simple NextJS + fms-api-client example

Note this is oversimplified, without any caching, SSR, Static generation etc.
It shows how to centrally configure and connect to fms, storing DAPI session info in MongoDB. See `lib/fm-connect.js`

## setup

1. Host the included `Contacts.fmp12` on FMS. Be sure to add a password.

2. Create a file called `.env.local` with these items:

   ```env
   MONGO_URL=mongodb+srv://ACCOUNT:PASSWORD@DB_NAME.sgrkc.mongodb.net/COLLECTION?retryWrites=true&w=majority


   # any name for identifying a client in MongoDB
   CLIENT_NAME=

   # database name
   DATABASE=

   # server address including https://
   SERVER=

   # DB creds
   USERNAME=
   PASSWORD=

   # CLIENT_USAGE_TRACKING=false
   ```

3. Install Dependencies

   ```bash
   npm install
   ```

4. Start developing!

   ```bash
   npm run dev
   ```
