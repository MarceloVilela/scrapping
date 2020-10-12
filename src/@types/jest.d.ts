declare namespace jest {
  interface Expect<R> {
    toContainHomePageObject(value: Object): CustomMatcherResult;
    toContainPostObject(value: Object): CustomMatcherResult;
    toContainMagnetResults(value: Object): CustomMatcherResult;
    toContainMagnetAnswers(value: Object): CustomMatcherResult;
  }
}