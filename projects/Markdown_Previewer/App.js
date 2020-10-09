import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: firstContent   // I assigned it in the very bottom
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      content : event.target.value
    });
  }
  
  render() {
    return (
      <div className="App">
        <Editor
          content = {this.state.content}
          handleChange = {this.handleChange}
        />
        <Preview
          content = {this.state.content}
        />
      </div>
    );
  }
}

class Editor extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="box-title">Editor</h3>
        <textarea
          id="editor"
          onChange={this.props.handleChange}
          value={this.props.content}
        >
        </textarea>
      </div>
    );
  }
}

class Preview extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="box-title">Preview</h3>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html:  marked(this.props.content, {breaks: true}) }} 
        >
        </div>
      </div>
    );
  }
}

const firstContent = `<h1>Heellooo Visitor</h1>
<h2>My name is Edward<h2>

### Nice to meet you

# Header 
## Sub header
[Link](https://www.freecodecamp.org/learn)
\`\`\`
/*code block:*/
.thick-green-border {
    border-color: green;
    border-width: 10px;
    border-style: solid;
    border-radius: 50%;
  }
\`\`\`
Inline code: \`<span></span>\`
- Item 1
- Item 2

> An unexamined life is not worth living.
Socrates

**And finally, an image:**![freeCodeCamp Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo6Gx6OrpizPFH8zCfDAZi810TPoNq4nbkyvnGSfr4L-SS4mmV&usqp=CAU)
`

export default App;
