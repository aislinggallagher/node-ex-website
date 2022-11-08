function evaluateExpression(expression) {
  console.log(expression);
  expression = expression.replace(/\s/g, "");
  console.log(expression);
  return helper(Array.from(expression), 0);
}
//test
function isOperator(char) {
  if(char == '*' || char =='+' || char == '-'|| char == '/'|| char == '^'|| char == 'e'|| char == 'l'){
    return true;
  }
  return false;
}

function helper(stack, idx) {
  try{ 
    for(var inty = 1; inty < stack.length; inty++) {
      current = stack[inty];
      prev = stack[inty - 1];
      if(isOperator(current) && isOperator(prev)) {
        if(current == '-' && (prev != '*' || prev != '/' || prev != 'e' || prev != 'l')) {
          continue;
        }
        throw "Invalid input";
      }
    }
    var stk = [];
    let sign = '+';
    let num = 0;
    for (let inty = idx; inty < stack.length; inty++) {
      let curr = stack[inty];
      if (curr >= '0' && curr <= '9') {
        num = num * 10 + (curr - '0');
      }
      if (!(curr >= '0' && curr <= '9') || inty === stack.length-1) {
        if (curr ==='(') {
          num = helper(stack, inty+1);
          let leng = 1;
          let res = 0;
          for (let brac = inty + 1; brac < stack.length; brac++) {
            if (stack[brac]===')') {
              res++;
              if (res === leng) {
                inty = brac; 
                break;
              }
            }
            else if (stack[brac] === '(') 
            leng++;
          }
        }
        let pre = -1;
        switch (sign) {
          case '^':
            pre = stk.pop();
            stk.push(Math.pow(num, pre));
            break;
          case '+':
            stk.push(num);
            break;
          case '-':
            stk.push(num*-1);
            break;
          case '*':
            pre = stk.pop();
            stk.push(pre*num);
            break;
          case '/':
            pre = stk.pop();
            stk.push(pre/num);
            break;
          case 'e':
            pre = stk.pop();
            stk.push(Math.exp(pre));
            break;
          case 'l':
            pre = stk.pop();
            stk.push((Math.log(num) / (Math.log(pre))));
            break;
          default:
            throw "Invail input";
        }
        sign = curr;
        num = 0;
        if (curr ===')') break;
      }
    }
    let ans = 0;
    while (stk.length > 0) {
      ans += stk.pop();
    }
    let ansRounded = ans.toFixed(3);
    if(ansRounded %1 == 0){
    ansRounded = Math.trunc(ansRounded);
   }
    return ansRounded;
  }catch(error){
    console.log(error);
    return "Invalid input, please try again";
  }
}

exports.evaluateExpression = evaluateExpression;
exports.isOperator = isOperator;
exports.helper = helper;
