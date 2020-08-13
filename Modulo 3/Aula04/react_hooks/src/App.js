import React, { useState, useEffect } from "react";
import { getFormattedTimeStamp } from "./helpers/dateTimeHelpers";

export default function App() {
  // Definicao do estado
  // Destruturacao do array
  // Funcao que vai trocar o valor dessa variavel

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getFormattedTimeStamp());

    setClickArray(newClickArray);
  };

  const [clickArray, setClickArray] = useState([]);

  useEffect(()=> {
    document.title = clickArray.length;
  })
  
  return (
    <div>
      <h1>
        React e <em>Hooks</em>
      </h1>

      <button onClick={handleClick}>Click aqui!</button>

      <ul>
        {clickArray.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
