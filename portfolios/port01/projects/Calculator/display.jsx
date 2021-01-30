import React from 'react';

class Display extends React.Component {
    render() {
        return (
            <div className="display">
                <div className="formula">
                    {this.props.formula}
                </div>
                <div id="display" className="result">
                    {this.props.result}
                </div>
            </div>
        );
    }
}

export default Display;
