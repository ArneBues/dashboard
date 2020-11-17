export interface TestCase {
  id: number;
  name: string;
  description: string;
  file?: string | null;
  filename?: string | null;
  successPercent: string | number;
  realFile?: File;
  manuell?: boolean;
}

export interface Tests {
  id: number;
  percentage: number;
  email: string;
  Date: Date;
  testCase?: TestCase;
}

export interface TestGroup {
  id: number;
  name: string;
  description: string;
  date: Date;
  interval: number;
  lastTest?: Date;
  testCases?: TestCase[];
  // eslint-disable-next-line no-use-before-define
  TestResult?: TestResult[];
}

export interface TestResult {
  id: number;
  testGroup?: TestGroup;
  date?: Date;
  tests: Tests[];
}
