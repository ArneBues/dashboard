import * as imap from 'imap-simple';
import * as _ from 'lodash';
import * as mailparser from 'mailparser';
import { exit } from 'process';

let config = {
  imap: {
    user: 'skarbues',
    password: 'bRRCWmd2nrpLKsCl',
    host: 'mailbox.uni-duisburg-essen.de',
    port: 993,
    tls: true,
    authTimeout: 3000,
  },
};
var delay = 24 * 3600 * 1000;
var yesterday = new Date();
yesterday.setTime(Date.now() - delay);
let yesterday2 = yesterday.toISOString();

imap.connect(config).then((conn) => {
  return conn.openBox('INBOX').then(function () {
    var searchCriteria = ['UNSEEN', ['SINCE', yesterday]];

    var fetchOptions = {
      bodies: ['HEADER', 'TEXT', ''],
      markSeen: false,
    };

    return conn.search(searchCriteria, fetchOptions).then(function (messages) {
      messages.forEach(function (item) {
        var all = _.find(item.parts, { which: '' });
        var header = _.find(item.parts, { which: 'HEADER' });
        let from = header?.body.from[0];
        if (all !== undefined && from.search('report@analysis.urkund.com') !== -1) {
          console.log(from);
          var id = item.attributes.uid;
          var idHeader = 'Imap-Id: ' + id + '\r\n';
          mailparser.simpleParser(idHeader + all.body, (err, mail) => {
            // access to the whole mail object
            console.log(err);
            console.log(mail.subject);
            console.log(mail.text);
          });
        }
      });
    });

    // =>
    //   [ 'Hey Chad, long time no see!',
    //     'Your amazon.com monthly statement',
    //     'Hacker Newsletter Issue #445' ]
  });
});
