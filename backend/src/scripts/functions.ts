import * as imap from 'imap-simple';
import _ from 'lodash';
import * as mailparser from 'mailparser';
import { getCustomRepository } from 'typeorm';
import SendMail from '../email/sendMail';
import { imapConfig, sendConfig } from '../../config';
import { TestCaseRepository } from '../repository/testCaseRepository';
import { TestGroupRepository } from '../repository/testGroupRepository';
import { TestGroupResultRepository } from '../repository/testGroupResult';
import { TestRepository } from '../repository/testRepository';

var delay = 24 * 3600 * 1000 * 20;
var yesterday = new Date();
yesterday.setTime(Date.now() - delay);
let yesterday2 = yesterday.toISOString();

const regex = /URKUNDID:([0-9]*)#END/;
const regexPercentage = /\[Urkund\] ([0-9]*)%/;

// Mail Überüfen
export async function checkMails() {
  let output: string[] = [];
  console.log('checking Mail');
  output.push('Emails Überprüfen');
  // Datenbank Verbindung
  const testRepository = getCustomRepository(TestRepository);

  // Verbindung über IMAP mit den email Konto
  const conn = await imap.connect(imapConfig);
  await conn.openBox('INBOX');

  console.log('opened inbox');
  output.push('Inbox geöffnet');

  var searchCriteria = ['UNSEEN', ['SINCE', yesterday]];

  var fetchOptions = {
    bodies: ['HEADER', 'TEXT', ''],
    markSeen: true,
  };

  // alle ungelesen Emails in den letzten 24 Stunden abrufen
  const messages = await conn.search(searchCriteria, fetchOptions);

  for (const item of messages) {
    const all = _.find(item.parts, { which: '' });
    if (all !== undefined) {
      console.log('message');
      output.push('Email Gefunden');
      const id = item.attributes.uid;
      const idHeader = 'Imap-Id: ' + id + '\r\n';
      const mail = await mailparser.simpleParser(idHeader + all.body);
      // Email von Urkund
      if (mail?.from?.value[0].address.search('urkund') !== -1) {
        //console.log(mail.text)
        console.log('urkund mail found');
        output.push('Email von Urkund');
        if (mail.text !== undefined && mail.subject !== undefined) {
          // Anhand der gesendet Kennzahl wird die E-Mail identifiziert
          const testID = regex.exec(mail.text);
          // Auslessen der Prozentzahl
          const testPercentage = regexPercentage.exec(mail.subject);
          // Email mit Resultat der Plagiatssoftware
          if (testID !== null && testPercentage !== null) {
            const test = await testRepository.findById(testID[1]);
            test.email = mail.text !== undefined ? mail.text : '';
            test.percentage = Number(testPercentage[1]);
            // Resultat in der DB speichern
            await testRepository.save(test);
            console.log('Email Saved');
            output.push('Ergebnis für ' + test.testCase.name + ' gespeichert');
          }
        }
      }
    }
  }

  conn.end();
  return output;
}

// Testreihen senden
export async function SendTestGroups() {
  try {
    let output: string[] = [];
    console.log('Sending Test Groups');
    output.push('TestGruppen Senden');
    const mailer = new SendMail(sendConfig);

    // Datenbank verbindung
    const testGroupRepository = getCustomRepository(TestGroupRepository);
    const testRepository = getCustomRepository(TestRepository);
    const testGroupResultRepository = getCustomRepository(TestGroupResultRepository);
    const testCaseRepository = getCustomRepository(TestCaseRepository);

    const testGroups = await testGroupRepository.find({
      relations: ['testCases'],
    });

    for (const testGroup of testGroups) {
      const e = await testGroupResultRepository.new(testGroup);
      testGroup.lastTest = new Date();

      for (let testCase of testGroup.testCases) {
        const testCase2 = await testCaseRepository
          .createQueryBuilder('testcase')
          .addSelect('testcase.file')
          .where({ id: testCase.id })
          .getOne();

        if (testCase2 && testCase2.file) {
          const test = await testRepository.createTest(testCase, e);
          try {
            // E-Mail senden
            const mail = await mailer.sendMail(test, testCase2.file);
            console.log(testGroup.name + ' ' + testCase.name + ' sent');
            output.push(testGroup.name + ' ' + testCase.name + ' sent');
          } catch (err) {
            output.push('Email konnte nicht gesendet werden: ' + testCase.name);
            console.log(err);
          }
        }
      }

      testGroupRepository.save(testGroup);
    }
    return output;
  } catch (err) {
    console.log(err);
  }
}
