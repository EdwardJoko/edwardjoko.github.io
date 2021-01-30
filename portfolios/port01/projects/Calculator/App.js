import React from 'react';
import Display from './display';
import Buttons from './buttons'
import './App.scss';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      result: '0',
      anyComma: false,
      parenthesesAmount: 0
    }
    this.handleClear = this.handleClear.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleParentheses = this.handleParentheses.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleComma = this.handleComma.bind(this);
  }

  handleClear() {
    this.setState({
      formula: '',
      result: '0',
      anyComma: false,
      parenthesesAmount: 0
    });
  }

  handleDelete() {
    let formula = this.state.formula;
    let result = this.state.result;
    let lastFormula = formula[formula.length - 1];
    let lastResult = result[result.length - 1];

    if (lastFormula === ')') {
      let parentheses = this.state.parenthesesAmount;
      parentheses += 1;
      formula = formula.substr(0, formula.length - 1);
      this.setState({
        formula,
        parenthesesAmount: parentheses
      });
    }
    else if (lastFormula === '(') {
      let parentheses = this.state.parenthesesAmount;
      parentheses -= 1;
      formula = formula.substr(0, formula.length - 1);
      if (formula.length === 0) {
        result = '0';
        this.setState({
          formula,
          result,
          parenthesesAmount: parentheses
        });
      }
      else {
        this.setState({
          formula,
          parenthesesAmount: parentheses
        });
      }
    }
    else if (!isNaN(lastResult) && result.length > 1
                                && formula === '') {
      result = result.substr(0, result.length - 1);
      this.setState({
        result
      });
    }
    else if (result.length === 1 && formula.length === 1) {
      formula = '';
      result = '0';
      this.setState({
        formula,
        result
      });
    }
    else if (result.length === 1) {
      formula = formula.substr(0, formula.length-1);
      result = '0';
      this.setState({
        formula,
        result
      });
    }
    else if (result[result.length - 1] === '.') {
      formula = formula.substr(0, formula.length-1);
      result = result.substr(0, result.length-1);
      let anyComma = false;
      this.setState({
        formula,
        result,
        anyComma
      });
    }
    // buat operator
    else if (isNaN(lastFormula) && formula.length > 0) {
      formula = formula.substr(0, formula.length - 1);
      result = '0';
      this.setState({
        formula,
        result
      });
    }
    // buat angka
    else if (result.length > 0 && formula.length > 0) {
      formula = formula.substr(0, formula.length - 1);
      result = result.substr(0, result.length-1);
      this.setState({
        formula,
        result
      });
    }
  }

  handleEqual() {
    let formula = this.state.formula;
    let parentheses = this.state.parenthesesAmount;
    let lastFormula = formula[formula.length - 1];

    if (lastFormula !== ')' && isNaN(lastFormula)) {
      if (lastFormula !== '+')
        formula += '0'
      else
        formula += isNaN(lastFormula) ? '+0' : '';
    }

    while (parentheses > 0) {
      formula += ')';
      parentheses -= 1;
    }

    let result = formula ? (eval(formula)).toString() : "0";
    this.setState({
      formula: '',
      result,
      parenthesesAmount: parentheses,
      anyComma: false
    });
  }

  handleOperators(e) {
    let operator = (e.target.innerHTML).toString();
    let formula = this.state.formula;
    let lastFormula = formula[formula.length - 1];
    let result = this.state.result;

    if (formula.length === 0 && result === '0'
        && (operator === '-' || operator === '+')) {
      formula += operator;
      this.setState({
        formula,
        result: operator
      });
    }
    else if (formula.length === 0 && result.length > 0) {
      formula = result + operator;
      this.setState({
        formula,
        result: operator
      });
    }
    else if (lastFormula === '('
             && (operator === '-' || operator === '+')) {
      formula += operator;
      this.setState({
        formula,
        result: operator,
        anyComma: false
      });
    }
    else if (lastFormula === ')') {
      formula += operator;
      this.setState({
        formula,
        result: operator,
        anyComma: false
      });
    }
    else if (isNaN(lastFormula) && operator === '-') {
      let parentheses = this.state.parenthesesAmount;
      if (lastFormula === '-') {
        formula += '(';
        parentheses += 1;
      }
      formula += operator;
      this.setState({
        formula,
        result: operator,
        anyComma: false,
        parenthesesAmount: parentheses
      });
    }
    else if ((lastFormula === '.' || isNaN(lastFormula))
            && formula.length > 1
            && !isNaN(formula[formula.length-2])) {
      formula = formula.substr(0, formula.length-1) + operator;
      this.setState({
        formula,
        result: operator,
        anyComma: false
      });
    }
    else if (formula.length === 1 && isNaN(formula)
             && (operator === '-' || operator === '+')) {
      this.setState({
        formula: operator,
        result: operator,
        anyComma: false
      });
    }
    else if (formula.length >= 1 && !isNaN(lastFormula)) {
      formula += operator;
      this.setState({
        formula,
        result: operator,
        anyComma: false
      });
    }
  }

  handleParentheses() {
    let formula = this.state.formula;
    let lastFormula = formula[formula.length - 1];
    let result = this.state.result;
    let parentheses = this.state.parenthesesAmount;
    let maximumInput = 18;

    if (lastFormula === ')' && formula.length >= 3
                            && parentheses === 0) {
      formula += '*(';
      parentheses += 1;
      this.setState({
        formula,
        parenthesesAmount: parentheses
      });
    }
    else if (formula === '' && result !== '0'
                            && !isNaN(result)) {
      formula = result + '*(';
      result = '';
      parentheses += 1;
      this.setState({
        formula,
        result,
        parenthesesAmount: parentheses
      });
    }
    else if (formula === '' && parentheses === 0
                            && formula.length < maximumInput) {
      formula += '(';
      result = '';
      parentheses += 1;
      this.setState({
        formula,
        result,
        parenthesesAmount: parentheses
      });
    }
    else if (lastFormula === ')' && parentheses > 0) {
      formula += ')';
      result = '';
      parentheses -= 1;
      this.setState({
        formula,
        result,
        parenthesesAmount: parentheses
      });
    }
    else if (isNaN(lastFormula) && lastFormula !== '.') {
      formula += '(';
      result = '';
      parentheses += 1;
      this.setState({
        formula,
        result,
        parenthesesAmount: parentheses
      });
    }
    else if (!isNaN(lastFormula) && parentheses > 0) {
      formula += ')';
      result = '';
      parentheses -= 1;
      this.setState({
        formula,
        result,
        parenthesesAmount: parentheses
      });
    }
    else if (lastFormula === '.' && parentheses > 0) {
      formula = formula.substr(0, formula.length-1);
      result = result.substr(0, result.length-1);
      formula += ')';
      result = '';
      parentheses -= 1;
      this.setState({
        formula,
        result,
        parenthesesAmount: parentheses
      });
    }
  }

  handleNumbers(e) {
    let formula = this.state.formula;
    let stateResult = this.state.result;
    let lastResult = stateResult[stateResult.length - 1];
    let input = (e.target.innerHTML).toString();
    let maximumInput = 18;
    // if currently the value in the display is just zero. and the
    // input is also zero or zerozero. we don't accept it
    let num = (stateResult === '0' && input === '00') ?
              '0' : input;

    if (formula[formula.length - 1] === '(') {
      formula += num;
      stateResult = num;
      this.setState({
        formula,
        result: stateResult
      });
    }
    else if (formula[formula.length - 1] === ')') {
      formula += '*' + num;
      stateResult = num;
      this.setState({
        formula,
        result: stateResult
      });
    }
    else if (isNaN(lastResult)
          && lastResult !== '.'
          && formula.length < maximumInput) {
      formula += num;
      this.setState({
        formula,
        result: num
      });
    }
    else if (formula === '' ) {
      let result = num;
      formula = (formula === '' || formula === '0') ?
                   num : formula + num;
      this.setState({
        formula, result
      });
    }
    else if (formula.length < maximumInput) {
      let result = stateResult === '0' ? num : stateResult + num;
      formula = (formula === '' || formula === '0') ?
                num : formula + num;
      this.setState({
        formula, result
      });
    }
  }

  handleComma() {
    let maximumInput = 18;
    let comma = '.';
    let anyComma = false;
    let result = this.state.result;

    for (let i = 0; i < result.length; i++) {
      if (result[i] === comma) anyComma = true;
    }

    if (!anyComma && !this.state.anyComma
        && this.state.formula.length < maximumInput) {
      anyComma = true;
      let result = this.state.result;
      let formula = this.state.formula;
      let lastFormula = formula[formula.length - 1];

      if (formula === '') {
        formula = result + comma;
        result += comma;
        this.setState({
          formula, result, anyComma
        });
      }
      else if (isNaN(lastFormula)) {
        formula += '0' + comma;
        result = '0' + comma;
        this.setState({
          formula, result, anyComma
        });
      }
      else {
        formula += comma;
        result += comma;
        this.setState({
          formula, result, anyComma
        });
      }
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display
          formula={this.state.formula}
          result={this.state.result}
        />
        <Buttons
          clear={this.handleClear}
          delete={this.handleDelete}
          equal={this.handleEqual}
          operators={this.handleOperators}
          parentheses={this.handleParentheses}
          numbers={this.handleNumbers}
          comma={this.handleComma}
        />
      </div>
    );
  }
}

export default App;
