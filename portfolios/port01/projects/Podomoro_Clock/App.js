import React from 'react';
import accurateInterval from 'accurate-interval';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clockIsRunning: false,
      whichClock: 'Work',
      workDuration: 1500,
      breakDuration: 300,
      workDurationDisplayed: 1500,
      breakDurationDisplayed: 300,
      displayedTime: 1500
    }
    this.handleStartPause = this.handleStartPause.bind(this);
    this.handleRefresh    = this.handleRefresh.bind(this);
    this.workIncrement    = this.workIncrement.bind(this);
    this.workDecrement    = this.workDecrement.bind(this);
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
      whichClock: 'Work',
      workDuration: 1500,
      breakDuration: 300,
      workDurationDisplayed: 1500,
      breakDurationDisplayed: 300,
      displayedTime: 1500
    });
  }
  
  workIncrement(time) {
    if (time < 3600) {
      let workDuration = time + 60;
      this.setState({
        workDurationDisplayed: workDuration,
        workDuration
      });
      if (this.state.whichClock === 'Work') {
        this.setState({
          displayedTime: workDuration
        });
      }
    }
  }
  
  workDecrement(time) {
    if (time > 60) {
      let workDuration = time - 60;
      this.setState({
        workDurationDisplayed: workDuration,
        workDuration
      });
      if (this.state.whichClock === 'Work') {
        this.setState({
          displayedTime: workDuration
        });
      }
    }
  }
  
  breakIncrement(time) {
    if (time < 3600) {
      let breakDuration = time + 60;
      this.setState({
        breakDurationDisplayed: breakDuration,
        breakDuration
      });
      if (this.state.whichClock === 'Break') {
        this.setState({
          displayedTime: breakDuration
        });
      }
    }
  }
  
  breakDecrement(time) {
    if (time > 60) {
      let breakDuration = time - 60;
      this.setState({
        breakDurationDisplayed: breakDuration,
        breakDuration
      });
      if (this.state.whichClock === 'Break') {
        this.setState({
          displayedTime: breakDuration
        });
      }
    }
  }
  
  countDown() {
    if (this.state.clockIsRunning) {
      let workDuration  = this.state.workDurationDisplayed;
      let breakDuration = this.state.breakDurationDisplayed;
      let whichClock    = this.state.whichClock;
      
      if (whichClock === 'Work') {
        workDuration -= 1;
        if (workDuration >= 0) {
          this.setState({
            workDurationDisplayed: workDuration,
            displayedTime: workDuration
          });
        } else {
          this.audioBeep.play();
          workDuration = this.state.workDuration;
          this.setState({
            workDurationDisplayed: workDuration,
            displayedTime: breakDuration,
            whichClock: 'Break'
          });
        }
      }
      else {
        breakDuration -= 1;
        if (breakDuration >= 0) {
          this.setState({
            breakDurationDisplayed: breakDuration,
            displayedTime: breakDuration
          });
        } else {
          this.audioBeep.play();
          breakDuration = this.state.breakDuration;
          this.setState({
            breakDurationDisplayed: breakDuration,
            displayedTime: workDuration,
            whichClock: 'Work'
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
          workDuration     = {this.state.workDuration}
          breakDuration    = {this.state.breakDuration}
          onStartPause     = {this.handleStartPause}
          onRefresh        = {this.handleRefresh}
          workIncrement    = {this.workIncrement}
          workDecrement    = {this.workDecrement}
          breakIncrement   = {this.breakIncrement}
          breakDecrement   = {this.breakDecrement}
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
    let workDuration   = this.props.workDuration;
    let breakDuration  = this.props.breakDuration;
    return (
      <div className="controller">
        <div className="increment-decrement">
          <div id="session-label">
            <span className="session-break">Work</span>
            <div className="buttons">
              <button
                id="session-increment"
                onClick={ () => 
                  this.props.workIncrement(workDuration)
                }
              >
                <i className="fa fa-chevron-up"/>
              </button>
              <div id="session-length">
                {workDuration / 60}
              </div>
              <button
                id="session-decrement"
                onClick={ () =>                             
                  this.props.workDecrement(workDuration)
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
                  this.props.breakIncrement(breakDuration)
                }
              >
                <i className="fa fa-chevron-up"/>
              </button>
              <div id="break-length">
                {breakDuration / 60}
              </div>
              <button
                id="break-decrement"
                onClick={ () =>                             
                  this.props.breakDecrement(breakDuration)
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
