import path from 'path';
import express from 'express';
import compression from 'compression';
import { BUILD_DIR } from '../webpack/constants';

const PORT = 4000;

const runServer = () => {
  const app = express();

  app.use(compression());

  app.use(express.static(BUILD_DIR));

  app.get('*', (req, res) => {
    res.sendFile(path.join(BUILD_DIR, '/index.html'));
  });

  app.listen(PORT, error => {
    if (error) {
      throw error;
    }

    console.log(`Server has been successfully started at the port ${PORT}`);
  });
};

runServer();
