import React from 'react';
import './App.css';

const GET_PARAMS: RequestInit =  {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
}

async function content()  {
  const resp = await fetch('api/sounds', GET_PARAMS)
  const parsed = await resp.json();
  console.log(parsed);
  debugger;
  return parsed
}

interface AppProps {

}

interface AppState {

}

class _App extends React.Component<AppProps, AppState> {

  render() {
    content()
    return (
      <div className="App">
        <p>{}</p>
  
      </div>
    );

  }
}

export const App = _App;
