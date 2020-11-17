import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { emailadress, urkundmail } from '../../config';
import { Test } from '../entity/test';

export default class SendMail {
  transporter: Mail;
  constructor(config: NodeMailerConfig) {
    // Verbindung mit E-Mail-Konto herstellen
    this.transporter = nodemailer.createTransport(config);
  }

  sendMail(test: Test, file: Buffer): Promise<any> {
    if (!file) return Promise.reject('File doesnt exists');
    return this.transporter.sendMail({
      from: '"Uni Due" <' + emailadress + '>',
      to: urkundmail,
      subject: String(test.id),
      text: 'URKUNDID:' + test.id + '#END',
      attachments: [
        {
          filename: test.testCase.filename,
          content: file,
        },
      ],
    });
  }
}

export interface NodeMailerConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}
