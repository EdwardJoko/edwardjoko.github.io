import React from "react";
import DrumPad from './drumpad';

class PadBank extends React.Component {
    render() {
        let padBank;
        this.props.power ? 
            padBank = this.props.musicBank.map((drumObj, i) => {
                return (
                    <DrumPad
                        key={drumObj.id}
                        clipId={drumObj.id}
                        clip={drumObj.url}
                        keyTrigger={drumObj.keyTrigger}
                        keyCode={drumObj.keyCode}
                        power={this.props.power}
                        changeDisplay={this.props.changeDisplay}
                    />
                )
            }) :
            padBank = this.props.musicBank.map((drumObj, i) => {
                return (
                    <DrumPad
                        key={drumObj.id}
                        clipId={drumObj.id}
                        clip="#"
                        keyTrigger={drumObj.keyTrigger}
                        keyCode={drumObj.keyCode}
                        power={this.props.power}
                    />
                )
            });
        // console.log("Joko: ", padBank);
    
        return (
            <div className="padbank">
                {padBank}
            </div>
        );
    }
}

export default PadBank;
