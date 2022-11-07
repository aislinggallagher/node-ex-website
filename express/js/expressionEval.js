function evaluateExpression(expression) {
  console.log(expression);
  expression = expression.replace(/\s/g, "");
  console.log(expression);
  return helper(Array.from(expression), 0);
}

function isOperator(char) {
  if (
    char == "*" ||
    char == "+" ||
    char == "-" ||
    char == "/" ||
    char == "^" ||
    char == "e" ||
    char == "l"
  ) {
    return true;
  }

  return false;
}

function helper(s, idx) {
  try {
    for (var i = 1; i < s.length; i++) {
      current = s[i];
      prev = s[i - 1];
      if (isOperator(current) && isOperator(prev)) {
        if (
          current == "-" &&
          (prev != "*" || prev != "/" || prev != "e" || prev != "l")
        ) {
          continue;
        }
        throw "Invalid input";
      }
    }
    var stk = [];
    let sign = "+";
    let num = 0;
    for (let i = idx; i < s.length; i++) {
      let c = s[i];
      if (c >= "0" && c <= "9") {
        num = num * 10 + (c - "0");
      }
      if (!(c >= "0" && c <= "9") || i === s.length - 1) {
        if (c === "(") {
          num = helper(s, i + 1);
          let l = 1,
            r = 0;
          for (let j = i + 1; j < s.length; j++) {
            if (s[j] === ")") {
              r++;
              if (r === l) {
                i = j;
                break;
              }
            } else if (s[j] === "(") l++;
          }
        }
        let pre = -1;
        switch (sign) {
          case "^":
            pre = stk.pop();
            stk.push(Math.pow(num, pre));
            break;
          case "+":
            stk.push(num);
            break;
          case "-":
            stk.push(num * -1);
            break;
          case "*":
            pre = stk.pop();
            stk.push(pre * num);
            break;
          case "/":
            pre = stk.pop();
            stk.push(pre / num);
            break;
          case "e":
            pre = stk.pop();
            stk.push(Math.exp(pre));
            break;
          case "l":
            pre = stk.pop();
            stk.push(Math.log(num) / Math.log(pre));
            break;
          default:
            throw "Invail input";
        }
        sign = c;
        num = 0;
        if (c === ")") break;
      }
    }
    let ans = 0;
    while (stk.length > 0) {
      ans += stk.pop();
    }

    let ansRounded = ans.toFixed(3);
    if (ansRounded % 1 == 0) {
      ansRounded = Math.trunc(ansRounded);
    }
    return ansRounded;
  } catch (error) {
    console.log(error);
    return "Invalid input, please try again";
  }
}

exports.evaluateExpression = evaluateExpression;
exports.isOperator = isOperator;
exports.helper = helper;
