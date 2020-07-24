import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';
import UpperBox from "./UpperBox";
import LowerBox from "./LowerBox";

function App() {
  return (
    <div className="App">
        <UpperBox className={ 'gridSeparator' }></UpperBox>
        <LowerBox/>
    </div>
  );
}

export default App;
