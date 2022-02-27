import { bootstrap } from '@infra/bootstrap.infra';

import { Main } from './main/index';

async function start() {
  await bootstrap();
  new Main().start();
}
start();
