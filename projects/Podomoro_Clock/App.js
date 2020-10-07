import React from 'react';
import accurateInterval from 'accurate-interval';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clockIsRunning: false,
      whichClock: 'Session',
      sessionLength: 1500,
      breakLength: 300,
      sessionLengthDisplayed: 1500,
      breakLengthDisplayed: 300,
      displayedTime: 1500
    }
    this.handleStartPause = this.handleStartPause.bind(this);
    this.handleRefresh    = this.handleRefresh.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement   = this.breakIncrement.bind(this);
    this.breakDecrement   = this.breakDecrement.bind(this);
    this.countDown        = this.countDown.bind(this);
    accurateInterval(() => this.countDown(), 1000);
  }
  
  handleStartPause() {
    let clockIsRunning = !this.state.clockIsRunning;
    this.setState({ clockIsRunning });
  }
  
  handleRefresh() {
    this.setState({
      clockIsRunning: false,
      whichClock: 'Session',
      sessionLength: 1500,
      breakLength: 300,
      sessionLengthDisplayed: 1500,
      breakLengthDisplayed: 300,
      displayedTime: 1500
    });
  }
  
  sessionIncrement(time) {
    if (time < 3600) {
      let sessionLength = time + 60;
      this.setState({
        sessionLengthDisplayed: sessionLength,
        sessionLength
      });
      if (this.state.whichClock === 'Session') {
        this.setState({
          displayedTime: sessionLength
        });
      }
    }
  }
  
  sessionDecrement(time) {
    if (time > 60) {
      let sessionLength = time - 60;
      this.setState({
        sessionLengthDisplayed: sessionLength,
        sessionLength
      });
      if (this.state.whichClock === 'Session') {
        this.setState({
          displayedTime: sessionLength
        });
      }
    }
  }
  
  breakIncrement(time) {
    if (time < 3600) {
      let breakLength = time + 60;
      this.setState({
        breakLengthDisplayed: breakLength,
        breakLength
      });
      if (this.state.whichClock === 'Break') {
        this.setState({
          displayedTime: breakLength
        });
      }
    }
  }
  
  breakDecrement(time) {
    if (time > 60) {
      let breakLength = time - 60;
      this.setState({
        breakLengthDisplayed: breakLength,
        breakLength
      });
      if (this.state.whichClock === 'Break') {
        this.setState({
          displayedTime: breakLength
        });
      }
    }
  }
  
  countDown() {
    if (this.state.clockIsRunning) {
      let sessionLength = this.state.sessionLengthDisplayed;
      let breakLength = this.state.breakLengthDisplayed;
      let whichClock = this.state.whichClock;
      
      if (whichClock === 'Session') {
        sessionLength -= 1;
        if (sessionLength >= 0) {
          this.setState({
            sessionLengthDisplayed: sessionLength,
            displayedTime: sessionLength
          });
        } else {
          this.audioBeep.play();
          sessionLength = this.state.sessionLength;
          this.setState({
            sessionLengthDisplayed: sessionLength,
            displayedTime: breakLength,
            whichClock: 'Break'
          });
        }
      }
      else {
        breakLength -= 1;
        if (breakLength >= 0) {
          this.setState({
            breakLengthDisplayed: breakLength,
            displayedTime: breakLength
          });
        } else {
          this.audioBeep.play();
          breakLength = this.state.breakLength;
          this.setState({
            breakLengthDisplayed: breakLength,
            displayedTime: sessionLength,
            whichClock: 'Session'
          });
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Podomoro Clock</h1>
        <Clock
          time={this.state.displayedTime}
          whichClock={this.state.whichClock}
        />
        <Controller
          sessionLength    ={this.state.sessionLength}
          breakLength      ={this.state.breakLength}
          onStartPause     ={this.handleStartPause}
          onRefresh        ={this.handleRefresh}
          sessionIncrement ={this.sessionIncrement}
          sessionDecrement ={this.sessionDecrement}
          breakIncrement   ={this.breakIncrement}
          breakDecrement   ={this.breakDecrement}
        />
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
       </div>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.clockify = this.clockify.bind(this);
  }
  
  clockify(time) {
    let minutes = (Math.floor(time / 60)).toString();
    let seconds = (time - (minutes * 60)).toString();
    return minutes.padStart(2, "0") + ':' + seconds.padStart(2, "0")
  }

  render() {
    return (
      <div className="clock">
        <h1 id="timer-label">
          {this.props.whichClock}
        </h1>
        <div id="time-left">
          {this.clockify(this.props.time)}
        </div>
      </div>
    );
  }
}

class Controller extends React.Component {
  render() {
    let sessionLength = this.props.sessionLength;
    let breakLength   = this.props.breakLength;
    return (
      <div className="controller">
        <div className="increment-decrement">
          <div id="session-label">
            <span className="session-break">Session</span>
            <div className="buttons">
              <button
                id="session-increment"
                onClick={ () => 
                  this.props.sessionIncrement(sessionLength)
                }
              >
                <i className="fa fa-chevron-up"/>
              </button>
              <div id="session-length">
                {sessionLength / 60}
              </div>
              <button
                id="session-decrement"
                onClick={ () =>                             
                  this.props.sessionDecrement(sessionLength)
                }                                           
              >
                <i className="fa fa-chevron-down"/>
              </button>
            </div>
          </div>
          <div id="break-label">
            <span className="session-break">Break</span>
            <div className="buttons">
              <button
                id="break-increment"
                onClick={ () =>
                  this.props.breakIncrement(breakLength)
                }
              >
                <i className="fa fa-chevron-up"/>
              </button>
              <div id="break-length">
                {breakLength / 60}
              </div>
              <button
                id="break-decrement"
                onClick={ () =>                             
                  this.props.breakDecrement(breakLength)
                }                                           
              >
                <i className="fa fa-chevron-down"/>
              </button>
            </div>
          </div>
        </div>
        <div className="start-stop">
          <button
            id="start_stop"
            onClick={this.props.onStartPause}
          >
            <i className="fa fa-play"/>
            <i className="fa fa-pause"/>
          </button>
          <button
            id="reset"
            onClick={this.props.onRefresh}
          >
            <i className="fa fa-refresh"/>
          </button>
        </div>
      </div>
    );
  }
}


export default App;
