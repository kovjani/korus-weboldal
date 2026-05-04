<h3>Adatbázis telepítése</h3>

- server/src/sql mappa tartalmazza az install.sql fájlt. Ezzel lehet létrehozni az adatbázissémát.
- server/src/.env fájlba hozzuk létre az adatbázis eléréséhez szükséges adatokat. Példa a .env tartalmára:

```
DB_HOST=localhost
DB_USER=username
DB_PASS=password
DB_NAME=database
```

<h3>Backend a korus-weboldal mappából</h3>

```
cd server
npm i
npm run build
```

<h3>Frontend a korus-weboldal mappából</h3>

```
cd client
npm i
ng serve
```
