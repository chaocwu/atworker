export type Step = { step: string; expect: string };
export type Test = {
  suite: string;
  code: string;
  title: string;
  severity: string;
  owner: string;
  steps: Step[];
};
