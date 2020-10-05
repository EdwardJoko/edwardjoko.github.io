import React from 'react';
import './App.css';

new ClipboardJS('.btn'); // https://clipboardjs.com/
                         // we use it here because navigator.clipboard.writeText(password) doesn't work in codepen

class PasswordGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordLength: 8,
      type: 'alphabet',
      password: 'p@ssw0rd'
    }
    this.generatePassword   = this.generatePassword.bind(this);
    this.increaseLength     = this.increaseLength.bind(this);
    this.decreaseLength     = this.decreaseLength.bind(this);
    this.changePasswordType = this.changePasswordType.bind(this);
    // this.copyToClipboard    = this.copyToClipboard.bind(this);
  }

  generatePassword() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+=-)"
    let password = "";
    let passwordLength = this.state.passwordLength;
    let type = this.state.type;
    let max = 0; let index = 0;

    if (type === 'alphabet') max = 52;
    else if (type === 'alphanumeric') max = 62;
    else max = 77;
    
    for (let i = 0; i < passwordLength; i++) {
      index = Math.floor(Math.random() * max);
      password += characters[index];
    }

    this.setState({ password });
  }

  increaseLength() {
    let passwordLength = this.state.passwordLength;
    if (passwordLength < 20) {
      passwordLength += 1;
      this.setState({ passwordLength });
    }
  }
  
  decreaseLength() {
    let passwordLength = this.state.passwordLength;
    if (passwordLength > 4) {
      passwordLength -= 1;
      this.setState({ passwordLength });
    }
  }
  
  changePasswordType(num) {
    if (num === 1) { this.setState({ type: 'alphabet' }); }
    else if (num === 2) { this.setState({ type: 'alphanumeric' }); }
    else { this.setState({ type: 'alphasymbol' }); }
  
  }
  /*
  copyToClipboard() {
    let password = this.state.password;
    navigator.clipboard.writeText(password);
  };
  */

  render() {
    return (
      <div className="container pt-5">
        <div className="col-md-5 m-auto mb-4">
          <h4 className="title card text-white bg-secondary mb-3 p-3">
            Password Generator
          </h4>
          <div className="row mt-3">
            <h6 className="p-4 mt-4 mb-4">
              How long the password that you want?
            </h6>
            <div className="buttons m-auto">
              <button
                onClick={ () => this.increaseLength() }
              >
                <i className="fa fa-chevron-up"/>
              </button>
              <div className="password-length">
                {this.state.passwordLength}
              </div>
              <button
                onClick={ () => this.decreaseLength() }
              >
                <i className="fa fa-chevron-down"/>
              </button>
            </div>
          </div>
          <div className="column">
            <h6 className="p-4 mt-6">
              What kind of password that you want?
            </h6>
            <div className="row password-options">
              <button
                type="button"
                className={this.typePassword("alphabet")}
                onClick={ () => this.changePasswordType(1) }
              >
                Alphabet
              </button>
              <button
                type="button"
                className={this.typePassword("alphanumeric")}
                onClick={ () => this.changePasswordType(2) }
              >
                Alphanumeric
              </button>
              <button
                type="button"
                className={this.typePassword("alphasymbol")}
                onClick={ () => this.changePasswordType(3) }
              >
                Alphanumeric & Symbol
              </button>
            </div>
          </div>
          <div className="generate-password column mt-5">
            <button
              type="button" className="btn btn-secondary mb-3"
              onClick={ () => this.generatePassword() }
            >
              Generate Password
            </button>
            <div className="column">
              <div id="copy-target" className="password card bg-light text-white mt-4 p-2">
                {this.state.password}
              </div>
              <button
                type="button" className="btn btn-secondary copy mt-3"
                data-clipboard-target="#copy-target"
              >
                <i className="fas fa-clone"></i> Copy the password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  typePassword(type) {
    let classes = "btn btn-outline-secondary m-3 white";
    if (type === this.state.type) classes += " bg-secondary";
    return classes;
  }
}

export default PasswordGenerator;
