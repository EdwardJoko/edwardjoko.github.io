import React from 'react';

class Buttons extends React.Component {
    render() {
        return (
            <div className="buttons">
                <div className="uppers">
                    <div className="notequals">
                        <button
                            onClick={this.props.clear}
                            id="clear"  className="upper"
                        >
                            AC
                        </button>
                        <button
                            onClick={this.props.delete}
                            id="delete" className="upper"
                        >
                            C
                        </button>
                        <button
                            onClick={this.props.parentheses}
                            id="parentheses" className="upper"
                        >
                            ()
                        </button>
                    </div>
                    <div className="equals">
                        <button
                            onClick={this.props.equal}
                            id="equals" className="upper"
                        >
                            =
                        </button>
                    </div>
                </div> {/* uppers */}
                <div className="bottom">
                    <div className="numbers-and-decimal">
                        <button
                            onClick={this.props.numbers}
                            id="seven" className="number"
                        >
                            7
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="eight" className="number"
                        >
                            8
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="nine"  className="number"
                        >
                            9
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="four"  className="number"
                        >
                            4
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="five"  className="number"
                        >
                            5
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="six"   className="number"
                        >
                            6
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="one"   className="number"
                        >
                            1
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="two"   className="number"
                        >
                            2
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="three" className="number"
                        >
                            3
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="zero"  className="number"
                        >
                            0
                        </button>
                        <button
                            onClick={this.props.numbers}
                            id="zerozero" className="number"
                        >
                            00
                        </button>
                        <button
                            onClick={this.props.comma}
                            id="decimal"  className="number"
                        >
                            .
                        </button>
                    </div> {/* numbers-and-decimal */}
                    <div className="operators">
                        <button
                            onClick={this.props.operators}
                            id="add" className="operator"
                        >
                            +
                        </button>
                        <button
                            onClick={this.props.operators}
                            id="subtract" className="operator"
                        >
                            -
                        </button>
                        <button
                            onClick={this.props.operators}
                            id="multiply" className="operator"
                        >
                            *
                        </button>
                        <button
                            onClick={this.props.operators}
                            id="divide"   className="operator"
                        >
                            /
                        </button>
                    </div> {/* operators */}
                </div> {/* bottom */}
            </div> /* buttons */
        );
    }
}

export default Buttons;
