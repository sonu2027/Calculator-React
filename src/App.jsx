import { useEffect, useReducer, useState } from "react"
import "./App.css"
import Button from "./components/button/Button"
import Input from "./components/input/Input"

function reducer(state, action) {
  if (action.type == "back") {
    return state.slice(0, -1);
  }
  else if (action.type == "AC") {
    return []
  }
  else if (action.type == "getAns") {

    let str = ""
    let newArray = []
    for (let i = 0; i < state.length; i++) {
      if (state[i] >= 0 || state[i] == ".") {
        str = str + state[i]
      }
      else {
        if (state[i] != "√") {
          newArray.push(Number(str))
        }
        newArray.push(state[i])
        str = ""
      }
    }
    newArray.push(Number(str))
    console.log("newarr", newArray);


    function calculateExpression(expression) {
      const operators = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
        "^": 3,
        "√": 3,
      };
    
      const outputQueue = [];
      const operatorStack = [];
    
      for (const token of expression) {
        if (typeof token === "number") {
          outputQueue.push(token);
        } else if (typeof token === "string") {
          while (
            operatorStack.length > 0 &&
            operators[token] <= operators[operatorStack[operatorStack.length - 1]]
          ) {
            outputQueue.push(operatorStack.pop());
          }
          operatorStack.push(token);
        }
      }
    
      while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
      }
    
      const resultStack = [];
    
      for (const token of outputQueue) {
        if (typeof token === "number") {
          resultStack.push(token);
        } else if (typeof token === "string") {
          if (token === "√") {
            const operand = resultStack.pop();
            resultStack.push(Math.sqrt(operand));
          } else if (token === "^") {
            const exponent = resultStack.pop();
            const base = resultStack.pop();
            resultStack.push(Math.pow(base, exponent));
          } else {
            const b = resultStack.pop();
            const a = resultStack.pop();
            if (token === "+") resultStack.push(a + b);
            else if (token === "-") resultStack.push(a - b);
            else if (token === "*") resultStack.push(a * b);
            else if (token === "/") resultStack.push(a / b);
          }
        }
      }
    
      if (resultStack.length === 1) {
        return resultStack[0];
      } else {

        return "Invalid Expression";
      }
    }
    
    
    
    
    
    const result = calculateExpression(newArray);
    console.log("result", result); 
    
    
    
    return [result]
    
  }
  else {
    return [...state, action.val]
  }
}

function App() {
  const [inputValue, setInputValue] = useReducer(reducer, [])
  const [inputValueString, setInputValueString] = useState("")

  useEffect(() => {
    setInputValueString(inputValue.join(""))
    console.log("inpyt str", inputValueString);
  }, [inputValue])

  function handleArrayOfInputValue(num) {
    if (num == "back") {
      setInputValue({ type: "back" })
    }
    else if (num == "AC") {
      setInputValue({ type: "AC" })
    }
    else if (num == "=") {
      setInputValue({ type: "getAns" })
    }
    else {
      setInputValue({ type: "Update", val: num })
    }
  }

  console.log("InputVaue", inputValue);

  return (
    <div className="main-div">
      <div className="child-div">
        <h1 style={{textAlign:"center", marginTop:"1rem", textDecoration:"underline"}}>Calculator</h1>
        <Input val={inputValueString} change={handleArrayOfInputValue} />
        <Button click={handleArrayOfInputValue} />
      </div>
    </div>
  )
}

export default App