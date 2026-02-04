
export interface Student {
  name: string;
  className: string;
  points: number;
  level: number;
  completedChallenges: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Challenge {
  id: string;
  level: number;
  title: string;
  description: string;
  startingCode: string;
  testCases: TestCase[];
  points: number;
  hint: string;
}

export interface GradeResult {
  passed: boolean;
  actualOutput: string;
  error?: string;
  testResults: {
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
  }[];
}

export enum AppState {
  WELCOME = 'WELCOME',
  TUTORIAL = 'TUTORIAL',
  LEARNING = 'LEARNING',
  LEADERBOARD = 'LEADERBOARD'
}
