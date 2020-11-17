/*import { TestGroup } from "../entity/testgroup";
// Grab all Test Cases
// Create Test Group
// Create Test
// Send Emails

import { TestCaseRepository } from "../repository/testCaseRepository";
import { TestGroupRepository } from "../repository/testGroupRepository";
import { TestRepository } from "../repository/testRepository";
import SendMail from "./sendMail";
import { sendConfig } from './emailconfig';
import { TestCase } from "../entity/testcase";
import { getCustomRepository } from "typeorm";



export function createAndSendTest() {

  const testCaseRepository = getCustomRepository(TestCaseRepository);
  const testGroupRepository = getCustomRepository(TestGroupRepository);
  const testRepository = getCustomRepository(TestRepository);

  const sendMail = new SendMail(sendConfig);

  const a = new TestCase();
  a.description = "test";
  a.file = './src/email/examples/Bachelorthesis.docx';
  a.name = 'test';
  a.successPercent = 0.8;
  testCaseRepository.save(a);

  const testGroup = new TestGroup();
  testGroup.date = new Date();
  testGroup.tests = [];


  testCaseRepository.find().then((testCases) => {
    testCases.forEach(testCase => {
      testRepository.createTest(testCase).then(test => {
        testGroup.tests.push(test);
        sendMail.sendMail(testCase.file, testCase.id + "," + test.id)
          .then(e => {
            test.status = 1;
            console.log(e);
            testRepository.save(test);
          });

        if (testGroup.tests.length === testCases.length) {
          testGroupRepository.save(testGroup);
        }
      });
    })
  });
}*/
