import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

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

const tableHeader = () =>
    <thead>
        <tr>
            <th>Sound type</th>
            <th>Sound</th>
        </tr>
    </thead>



class _App extends React.Component<AppProps, AppState> {
  state: AppState = defaultState;



  randomGoodSound = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
    event.preventDefault();
    // randomSound().play();
    const sound: any = randomSoundFromArray(goodSounds(this.state.allAudioURLs))
    this.setState({currentSound: sound});
  }

  randomBadSound = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
    event.preventDefault();
    // randomSound().play();
    const sound: any = randomSoundFromArray(badSounds(this.state.allAudioURLs))
    this.setState({currentSound: sound});
  }

  randomAnySound = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
    event.preventDefault();
    // randomSound().play();
    const sound: any = randomSoundFromArray(this.state.allAudioURLs);
    this.setState({currentSound: sound});
  }


  async componentDidMount() {
    const allAudioURLs: any = await content()
    this.setState({allAudioURLs: allAudioURLs});
    // debugger;
    console.log(allAudioURLs);
    console.log(goodSounds(allAudioURLs));
    // const sound: any = randomSoundFromArray(goodSounds(this.state.allAudioURLs))
    // this.setState({currentSound: sound});
  }

  soundsByType() {
    if (this.state.allAudioURLs === null) {
      return <p></p>
    }
    const asType = this.state.allAudioURLs.map((item: any): any => {
      return {
        soundType: item.soundType,
        item: item
      };
    })
  return <></>
  }

  tableBody = () =>
    <tbody>
      {this.soundsByType()}

    </tbody>

  table = () =>
    <Table striped bordered hover>
      {tableHeader()}
      {this.tableBody()}
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
