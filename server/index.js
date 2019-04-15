import path from 'path';
import express from 'express';
import compression from 'compression';

const OUTPUT_PATH = path.resolve(__dirname, '../dist');
const PORT = 4000;

const runServer = () => {
  const app = express();
  app.use(compression());
  app.use((req, res, next) => {
    if (req.headers['accept-language']) {
      req.lang = req.headers['accept-language'].slice(0, 2);
    } else {
      req.lang = 'en';
    }

    next();
  });

  app.use(express.static(OUTPUT_PATH));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `${OUTPUT_PATH}/index.html`));
  });

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server has been successfully started at the port ${PORT}`);
  });
};

runServer();
