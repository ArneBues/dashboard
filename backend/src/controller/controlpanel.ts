import { checkMails, SendTestGroups } from '../scripts/functions';
import { BaseController } from './base';
export class ControlPanelController extends BaseController {
  public index(): void {
    this.res.send('Index Controller');
  }

  public async sendTestGroup() {
    try {
      const output = await SendTestGroups();
      this.response(output);
    } catch (err) {
      this.response(err, 500);
      console.log(err);
    }
  }

  public async checkEmails() {
    try {
      const output = await checkMails();
      this.response(output);
    } catch (err) {
      this.response(err, 500);
    }
  }
}
