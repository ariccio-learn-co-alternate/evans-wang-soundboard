import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { jsxAttribute } from '@babel/types';

const GET_PARAMS: RequestInit =  {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
}

async function content()  {
  // debugger;
  const resp: Response = await fetch('api/sounds', GET_PARAMS)
  const parsed = await resp.json();
  console.log(parsed);
  // debugger;
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
  allAudioURLs?: any;
  currentSound?: any;
}

const defaultState: AppState = {
  allAudioURLs : null,
  currentSound: null
}

const audioItem = (item?: any) =>
  <p>
    {item.name}
    <audio src={item.id ? `http://localhost:3000/api/sounds/${item.id}` : ""} key={`id-${item.id}-${item.name}`} controls/>
  </p>

const audioItemAutoplay = (item?: any) =>
  <p>
    {item.name}
    <audio autoPlay src={item.id ? `http://localhost:3000/api/sounds/${item.id}` : ""} key={`id-${item.id}-${item.name}`} controls  />
  </p>

const audioItems = (items: Array<any>) => 
  <>
  {items.map((item) => {return audioItem(item)})}
  </>

function goodSounds(allSoundURLs: Array<any>) : Array<any>{
  return allSoundURLs.filter(sound => {
    return sound.mood === "good";
  })
}

function badSounds(allSoundURLs: Array<any>) : Array<any>{
  return allSoundURLs.filter(sound => {
    return sound.mood === "bad";
  })
}

function randomSoundFromArray(sounds: Array<any>): any {
  const rand = Math.random()*sounds.length;
  const index = Math.floor(rand);
  const sound = sounds[index];
  if (sound === null) {
      throw new Error("Sound not valid");
  }
  console.log(`returning random sound: ${sound.id}`)
  return sound;
}

const eachTR = (anAudioItem: any): JSX.Element => 
  <>
    <td>
      {anAudioItem.sound_type}
    </td>
    <td>
      {anAudioItem.name}
    </td>
  </>
function soundsByType(allAudioURLs: any) {
  if (allAudioURLs === null) {
    return <tr></tr>
  }
  // const asType = allAudioURLs.map((item: any): any => {
  //   debugger;
  //   return {
  //     sound_type: item.sound_type,
  //     name: item.name,
  //     mood: item.mood
  //   };
  // })

  const soundTypes: Array<String> = [];
  allAudioURLs.forEach((item: any) => {
    if (soundTypes.includes(item.mood)) {
      soundTypes.push(item.mood);
    }
  })

  const asType = soundTypes.map((mood: String) => {
    return allAudioURLs.filter((url: any) => {
      return (url.mood === mood);
    })
  })
  debugger;
  return <>{asType.map((audioItem: any): any => {
      return <tr>
          {eachTR(audioItem)}
        </tr>
  })}</>
}
const soundsTableHeader = () =>
    <thead>
        <tr>
            <th>Sound type</th>
            <th>Sound</th>
        </tr>
    </thead>

const soundsTableBody = (allAudioURLs: any) =>
  <tbody>
    {soundsByType(allAudioURLs)}
  </tbody>



class SoundsOfType extends React.Component<AppState, AppProps> {
  state: AppState = defaultState;
  randomAnySound = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
    if (this.state.allAudioURLs === null) {
      return;
    }
    event.preventDefault();
    // randomSound().play();
    const sound: any = randomSoundFromArray(this.state.allAudioURLs);
    this.setState({currentSound: sound});
  }

  render() {
    return (
      <Button onClick={this.randomAnySound}>Random sound</Button>
    )
  }
}


class _App extends React.Component<AppProps, AppState> {
  state: AppState = defaultState;

  randomGoodSound = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
    event.preventDefault();
    if (this.state.allAudioURLs === null) {
      return;
    }
    // randomSound().play();
    const sound: any = randomSoundFromArray(goodSounds(this.state.allAudioURLs))
    this.setState({currentSound: sound});
  }

  randomBadSound = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
    if (this.state.allAudioURLs === null) {
      return;
    }
    event.preventDefault();
    // randomSound().play();
    const sound: any = randomSoundFromArray(badSounds(this.state.allAudioURLs))
    this.setState({currentSound: sound});
  }

  randomAnySound = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
    if (this.state.allAudioURLs === null) {
      return;
    }
    event.preventDefault();
    // randomSound().play();
    const sound: any = randomSoundFromArray(this.state.allAudioURLs);
    this.setState({currentSound: sound});
  }


  async componentDidMount() {
    const allAudioURLs: any = await content()
    console.log(allAudioURLs);
    this.setState({allAudioURLs: allAudioURLs});
    // debugger;
    console.log(goodSounds(allAudioURLs));
    // const sound: any = randomSoundFromArray(goodSounds(this.state.allAudioURLs))
    // this.setState({currentSound: sound});
    return;
  }




  table = () =>
    <Table striped bordered hover>
      {soundsTableHeader()}
      {soundsTableBody(this.state.allAudioURLs)}
    </Table>

  body() {
    return (
      <>
        <p><Button onClick={this.randomAnySound}>Random sound</Button></p>
        <p><Button onClick={this.randomGoodSound}>Random happy sound</Button></p>
        <p><Button onClick={this.randomBadSound}>Random bad sound</Button></p>
        {/* <audio src={this.state.allAudioURLs ? `http://localhost:3000/${this.state.allAudioURLs}` : ""} id="farts" controls/> */}
        { this.state.currentSound ? audioItemAutoplay(this.state.currentSound) : null}
        {/* {this.state.allAudioURLs ? audioItems(this.state.allAudioURLs) : null} */}
        {this.table()}
      </>
    );

  }

  render() {
    // content()
    // debugger;
    return (
      <div className="App">
        {this.body()}
      </div>
    );

  }
}

export const App = _App;
