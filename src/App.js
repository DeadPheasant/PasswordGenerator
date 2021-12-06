import { useState } from 'react';
import './App.css';
import { FaClipboard } from "react-icons/fa";

function App() {
  const [pwd, setPwd] = useState('')
  const checkbox = [
    {
      divClass: "uppercase",
      input_id: "pwd-uppercase",
      id: 1,
      value: "Include Uppercase"
    },
    {
      divClass: "lowercase",
      input_id: "pwd-lowercase",
      id: 2,
      value: "Include Lowercase"
    },
    {
      divClass: "number",
      input_id: "pwd-number",
      id: 3,
      value: "Include Number"
    },
    {
      divClass: "symbol",
      input_id: "pwd-symbol",
      id: 4,
      value: "Include Symbol"
    },
  ]
  const pwd_letters = {
    upper_pwd: "QWERTYUIOPLKJHGFDSAZXCVBNM",
    lower_pwd: "qwertyuioplkjhgfdsazxcvbnm",
    num_pwd: "1234567890",
    symbol_pwd: "!@#$%=&*?"
  }
  var red = {
    color: "red",
    animation: "shake 0.2s linear 5"
  }

  const purple = {
    color: "rgb(141, 0, 141)"
  }

  let pwd_arr = []

  const pwd_generator = () => {
    pwd_arr = Object.keys(pwd_letters).map(value => pwd_letters[value]).filter((value, index) => {
      return document.getElementById(checkbox[index].input_id).checked
    })
    setPwd(() => {
      let pwd_var = []
      let pwd_length = document.getElementById("pwd-length").value

      if (pwd_length > 4) {
        if (document.getElementById(checkbox[0].input_id).checked) {
          pwd_var = [...pwd_var, pwd_letters.upper_pwd[Math.floor(pwd_letters.upper_pwd.length * Math.random())]]
          pwd_length--
        }

        if (document.getElementById(checkbox[1].input_id).checked) {
          pwd_var = [...pwd_var, pwd_letters.lower_pwd[Math.floor(pwd_letters.lower_pwd.length * Math.random())]]
          pwd_length--
        }

        if (document.getElementById(checkbox[2].input_id).checked) {
          pwd_var = [...pwd_var, pwd_letters.num_pwd[Math.floor(pwd_letters.num_pwd.length * Math.random())]]
          pwd_length--
        }

        if (document.getElementById(checkbox[3].input_id).checked) {
          pwd_var = [...pwd_var, pwd_letters.symbol_pwd[Math.floor(pwd_letters.symbol_pwd.length * Math.random())]]
          pwd_length--
        }

        for (let i = 0; i < pwd_length; i++) {
          let ext = pwd_arr[Math.floor(pwd_arr.length * Math.random())]
          pwd_var = pwd_arr.length > 0 && [...pwd_var, ext[Math.floor(ext.length * Math.random())]]
        }
        return pwd_arr.length > 0 ? pwd_var.sort(() => Math.floor(Math.random() - 0.5)).toString().replace(/,/g, "") : "Check Atleast One Option"
      }
      return "Length Of Password Must Be > 4"
    })
  }

  const changeInput = (e) => {
    console.log(e.target.value)
  }

  const minus = () => {
    document.getElementById("pwd-length").value > 5 &&
      document.getElementById("pwd-length").value--
  }

  const plus = () => {
    document.getElementById("pwd-length").value < 25 &&
      document.getElementById("pwd-length").value++
  }

  let copied = pwd

  const copy = () => {
    pwd !== "Copied!" && navigator.clipboard.writeText(pwd)
    pwd !== "Copied!" && setPwd("Copied!")
    pwd !== "Copied!" && setTimeout(() => {
      setPwd(copied)
    }, 500)
  }
  return (
    <div className="App">
      <div className='container'>
        <div className="input">
          <h2>Create A Random Password</h2>
          <input
            style={document.getElementById("pwd-length") &&
              (document.getElementById("pwd-length").value > 4 &&
                (document.getElementById(checkbox[0].input_id).checked ||
                  document.getElementById(checkbox[1].input_id).checked ||
                  document.getElementById(checkbox[2].input_id).checked ||
                  document.getElementById(checkbox[3].input_id).checked) ?
                purple : red)}
            onChange={changeInput}
            value={pwd}
            className='pwd'
            type="text" />
          <button onClick={copy} className='clipboard'><FaClipboard /></button>
        </div>

        <div className="include">
          <div className="length">
            <label htmlFor="pwd-length">Length of Password</label>
            <div className='addsub'>
              <input
                onClick={minus}
                className='btn
                sub'
                value="-"
                type="button" />

              <input
                id='pwd-length'
                min={5}
                max={25}
                defaultValue={8}
                type="number" />

              <input
                onClick={plus}
                className='btn
                add'
                value="+"
                type="button" />
            </div>
          </div>

          {
            checkbox.map(value => {
              return (
                <div className={value.divClass} key={value.id}>
                  <label htmlFor={value.input_id}>{value.value}</label>
                  <input
                    id={value.input_id}
                    defaultChecked={true}
                    className='checkbox'
                    type="checkbox" />
                  <label className='span-checkbox' htmlFor={value.input_id}></label>
                </div>
              )
            })
          }
        </div>

        <div className="generate">
          <input
            onClick={pwd_generator}
            id='pwd-generate'
            value="Generate Pin"
            type="button" />
        </div>
      </div>
    </div>
  );
}

export default App;
