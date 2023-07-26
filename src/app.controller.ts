import { Controller, Head } from '@nestjs/common';

@Controller()
export class AppController {
  @Head()
  health() {
    return 'ok';
  }
}
