import React from 'react';
import PadBank from './components/padbank';
import bankOne from './components/sounds1';
import bankTwo from './components/sounds2';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: ' ',
      musicBank: bankOne,
      musicBankId: 'Heater Kit'
    }
    this.powerControl = this.powerControl.bind(this);
    this.changeMusicBank = this.changeMusicBank.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  // Controller methods
  powerControl() {
    let power = !this.state.power;
    let display = this.state.power ? "Power Off" : "Power On";
    
    if (this.state.power) {
      this.setState({
        power, display
      });
    } else {
      this.setState({
        power, display   
      });
      setTimeout(() =>
        this.changeDisplay(this.state.musicBankId), 1000
      );
    }
  }
  changeMusicBank() {
    if (this.state.power) {
      (this.state.musicBankId === 'Heater Kit') ?
        this.setState({
          musicBank: bankTwo,
          musicBankId: 'Smooth Piano Kit',
          display: 'Smooth Piano Kit'
        }) :
        this.setState({
          musicBank: bankOne,
          musicBankId: 'Heater Kit',
          display: 'Heater Kit'
        });
    }
  }
  changeDisplay(display) {
    if (this.state.power) {
      this.setState({
        display
      });
    }
  }

  render() {
    return (
      <div className="App" id="drum-machine">
        <PadBank
          power={this.state.power}
          musicBank={this.state.musicBank}
          musicBankId={this.state.musicBankId}
          changeDisplay={this.changeDisplay}
        />

        <div className="controller">
          <div className="powerButton">
            <span>Power</span>
            <button
              onClick={() => this.powerControl()}
              className="button"
            >
            </button>
            <div className="slider">
              <div className={this.onOffSlider()}></div>
            </div>
          </div>

          <div className="displayScreen" id="display">
            <p className="display">
              {this.state.display}
            </p>
          </div>

          <div className="musicBankOption">
            <span>Music Bank</span>
            <button
              onClick={() => this.changeMusicBank()}
              className="button"
            >
            </button>
            <div className="slider">
              <div className={this.musicBankSlider()}></div>
            </div>
          </div>
        </div> {/* controller */}
      </div>
    );
  }

  onOffSlider() {
    return this.state.power ? "sliderOn" : "sliderOff";
  }
  musicBankSlider() {
    return this.state.musicBankId === 'Heater Kit' ?
        "bankOne" : "bankTwo";
  }
}

export default App;
