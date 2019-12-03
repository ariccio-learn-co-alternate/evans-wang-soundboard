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
  // const fileResp = await fetch(`api/sounds/${parsed.sounds[0].id}`, {
  //   method: 'GET'
  //   })
  // debugger;
  // return `api/sounds/${parsed.sounds[0].id}`;
  return parsed.sounds
}

interface AppProps {

}

interface AppState {
  audioSrc?: any;
}

const defaultState: AppState = {
  audioSrc : ''
}

const audioItem = (item?: any) =>
  <p>
    {item.name}
    <audio src={item.id ? `http://localhost:3000/api/sounds/${item.id}` : ""} id={`id-${item.id}-${item.name}`} controls/>
  </p>


const audioItems = (items: Array<any>) => 
  <>
  {items.map((item) => {return audioItem(item)})}
  </>

class _App extends React.Component<AppProps, AppState> {
  state: AppState = defaultState;

  async componentDidMount() {
    this.setState({audioSrc: await content()});
    // debugger;
  }



  render() {
    // content()
    debugger;
    return (
      <div className="App">
        <p>{}</p>
        {/* <audio src={this.state.audioSrc ? `http://localhost:3000/${this.state.audioSrc}` : ""} id="farts" controls/> */}
        {this.state.audioSrc ? audioItems(this.state.audioSrc) : null}
      </div>
    );

  }
}

export const App = _App;
