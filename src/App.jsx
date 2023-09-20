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


    let new1Array = []
    let found = false
    let ans = 0
    for (let i = newArray.length - 1; i >= 0; i--) {
      if (newArray[i - 1] == '^' && found == false) {
        ans = Math.pow(newArray[i - 2], newArray[i])
        new1Array.push(ans)
        found = true
        i -= 2
      }
      else {
        new1Array.push(newArray[i])
      }
    }
    new1Array.reverse()


    let new2Array = []
    found = false
    ans = 0
    for (let i = 0; i < new1Array.length; i++) {
      if (new1Array[i] == "√" && found == false) {
        ans = Math.sqrt(new1Array[i + 1])
        new2Array.push(ans)
        found = true
        i += 1
      }
      else {
        new2Array.push(new1Array[i])
      }
    }



    let new3Array = []
    found = false
    ans = 0
    for (let i = 0; i < new2Array.length; i++) {
      if (new2Array[i + 1] == '/' && found == false) {
        ans = new2Array[i] / new2Array[i + 2]
        new3Array.push(ans)
        found = true
        i += 2
      }
      else {
        new3Array.push(new2Array[i])
      }
    }

    let new4Array = []
    found = false
    ans = 0
    for (let i = 0; i < new3Array.length; i++) {
      if (new3Array[i + 1] == '*' && found == false) {
        ans = new3Array[i] * new3Array[i + 2]
        new4Array.push(ans)
        found = true
        i += 2
      }
      else {
        new4Array.push(new3Array[i])
      }
    }




    let new5Array = []
    let count = 0
    ans = 0
    for (let i = 0; i < new4Array.length; i++) {
      if (new4Array[i + 1] == '-' && found == false) {
        if (count == 0) {
          ans = new4Array[i] - new4Array[i + 2]
          // new5Array.push(ans)
          count++
          i += 2
        }
        else {
          ans = ans - new4Array[i + 2]
          // new5Array.push(ans)
          count++
          i += 2
        }
      }
      else if(count>0){
        new5Array.push(ans)
        ans=0
      }
      else {
        new5Array.push(new4Array[i])
      }
    }




    state = new5Array
    return state
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
      if (inputValue.length > 1) {
        setInputValue({ type: "getAns" })
      }
    }
    else {
      setInputValue({ type: "Update", val: num })
    }
  }

  console.log("InputVaue", inputValue);

  return (
    <div className="main-div">
      <div className="child-div">
        {/* {gotAns == false ? <Input val={inputValue} change={handleArrayOfInputValue} /> :
          <Input val={finalAns} change={handleArrayOfInputValue} />} */}
        <Input val={inputValueString} change={handleArrayOfInputValue} />
        <Button click={handleArrayOfInputValue} />
      </div>
    </div>
  )
}

export default App