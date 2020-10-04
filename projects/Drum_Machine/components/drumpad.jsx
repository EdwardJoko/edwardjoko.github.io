import React from 'react';

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.playSound = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    handleKeyPress(e) {
        if (this.props.power) {
            if (e.keyCode === this.props.keyCode) {
                this.playSound();
            }
        }
    }
    playSound(e) {
        if (this.props.power) {
            this.props.changeDisplay(this.props.clipId);
            const sound = document.getElementById(this.props.keyTrigger);
            //console.log(sound);
            sound.currentTime = 0;
            sound.play();
        }
    }

    render() {
        return (
            <div
                className="drum-pad"
                id={this.props.clipId}
                onClick={this.playSound}
            >
                <audio
                    className='clip'
                    id={this.props.keyTrigger}
                    src={this.props.clip}
                >
                </audio>
                {this.props.keyTrigger}
            </div>
        );
    }
}

export default DrumPad;
