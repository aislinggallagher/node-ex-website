const evaluationFunctions = require("./expressionEval.js");

describe("Evaluation Function Valid", () => {
  it.each([
    ["1 + 2", 3],
    ["1 / 2", 0.5],
    ["2 * 2", 4],
    ["2 ^ 2", 4],
    ["-(2 + 3)", -5],
    ["-2 + -(2+3)", -7],
  ])("evaluating %p expecting %p", (expression, result) =>
    expect(Number(evaluationFunctions.evaluateExpression(expression))).toEqual(
      result
    )
  );
});

describe("Evaluation Function Valid", () => {
  it.each([["jiafsifwjif", "Invalid input, please try again"]])(
    "evaluating %p expecting %p",
    (expression, result) =>
      expect(evaluationFunctions.evaluateExpression(expression)).toEqual(result)
  );
});

describe("Is operator", () => {
  it.each([
    ["*", true],
    ["+", true],
    ["^", true],
    ["k", false],
    ["e", true],
  ])("checking if operator %p expecting %p", (operator, result) =>
    expect(evaluationFunctions.isOperator(operator)).toEqual(result)
  );
});

describe("Helper", () => {
  it.each([
    [["1", "+", "2"], 3],
    [["1", "-", "2"], -1],
    [["7", "/", "7"], 1],
    [["70", "/", "7"], 10],
  ])("checking if operator %p expecting %p", (expressionArray, result) =>
    expect(Number(evaluationFunctions.helper(expressionArray, 0))).toEqual(
      result
    )
  );
});
