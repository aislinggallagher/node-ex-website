function eval(expression) {
    console.log(expression);
    expression = expression.replace(/\s/g, '');
    console.log(expression);
    return helper(Array.from(expression), 0);
  }
  
  function helper(stk, index) {
    
    try{ 
      var stack = [];
      let sign = '+';
      let num = 0;
      for (let inty = index; inty < stk.length; inty++) {
        let curr = stk[inty];
        if (curr >= '0' && curr <= '9') {
          num = num * 10 + (curr - '0');
        }
        if (!(curr >= '0' && curr <= '9') || inty === stk.length-1) {
          if (curr ==='(') {
            num = helper(stk, inty+1);
            let length = 1, rep = 0;
            for (let bindex = inty+1; bindex < stk.length; bindex++) {
              if (stk[bindex]===')') {
                rep++;
                if (rep === length) {
                  inty = bindex; 
                  break;
                }
              }
              else if (stk[bindex]==='(') 
              length++;
            }
          }
          let pre = -1;
          switch (sign) {
            case '^':
              pre = stack.pop();
              stack.push(Math.pow(num, pre));
              break;
            case '+':
              stack.push(num);
              break;
            case '-':
              stack.push(num*-1);
              break;
            case '*':
              pre = stack.pop();
              stack.push(pre*num);
              break;
            case '/':
              pre = stack.pop();
              stack.push(pre/num);
              break;
            case 'e':
              pre = stack.pop();
              stack.push(Math.exp(pre));
              break;
            case 'l':
              pre = stack.pop();
              stack.push((Math.log(num) / (Math.log(pre))));
              break;
            default:
              throw "Invail input";
          }
          sign = curr;
          num = 0;
          if (c===')') break;
        }
      }
      let ans = 0;
      while (stack.length > 0) {
        ans += stack.pop();
      }
     let ansr = ans.toFixed(3);
      return ansr;

    }catch(error){
      console.log(error);
      return "Invalid input, please try again";
    }
   
  }
  
  