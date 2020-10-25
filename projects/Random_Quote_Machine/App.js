import React from 'react';
import './App.css';

class RandomMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfQuotes: [],
      quote: '',
      author: ''
    }
    this.getArrayOfQuote = this.getArrayOfQuote.bind(this);
    this.newQuote        = this.newQuote.bind(this);
  }
  
  componentDidMount() {
    // load data
    if (this.state.arrayOfQuotes.length === 0)
      this.getArrayOfQuote();
  }

  // Get the collection of quotes so we just need to fetch it
  // once and also set the first quote
  getArrayOfQuote() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(res => res.json())
      .then(data => {
        let quoteArray = data.quotes;
        let index = Math.floor(Math.random() * quoteArray.length);
        let firstQuote = quoteArray[index];
        this.setState({
          arrayOfQuotes: quoteArray,
          quote: firstQuote.quote,
          author: firstQuote.author
        });
      });
  }
  
  newQuote() {
    let index = Math.floor(Math.random() * this.state.arrayOfQuotes.length);
    let quote = this.state.arrayOfQuotes[index];
    this.setState({
      quote: quote.quote,
      author: quote.author
    })
  }
  
  render() {
    return (
      <div>
        <i className="fas fa-quote-right kutip"></i>
        <Quote
          quote = {this.state.quote}
          author = {this.state.author}
          newQuote = {
            this.state.arrayOfQuotes.length === 0 ?
              this.getArrayOfQuote: this.newQuote
          }
        />
      </div>
    );
  }
}

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.rgb = this.rgb.bind(this);
  }

  // React re-render component every single time it accepts new
  // props so we put it here so the background color change every
  // new quote
  rgb() {
    let r = Math.floor(Math.random() * 150);
    let g = Math.floor(Math.random() * 150);
    let b = Math.floor(Math.random() * 150);
    return `rgb(${r}, ${g}, ${b})`;
  }

  render() {
    let colorDisplay=this.rgb();
    let quote=encodeURIComponent(this.props.quote);
    let author=encodeURIComponent(this.props.author);

    return (
      <div
        id="quote-box"
        className="container"
        style={{backgroundColor:colorDisplay}}
      >
        <div className="quote">
          <div id="text">{this.props.quote}</div>
          <div id="author">-{this.props.author}</div>
        </div>

        <footer>
          <a
            href={`https://twitter.com/intent/tweet?text="${quote}"-${author}`}
            target="_blank" rel="noopener noreferrer"
            style={{backgroundColor:colorDisplay}}
            id="tweet-quote"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <button
            id="new-quote"
            onClick={() => this.props.newQuote()}
            style={{backgroundColor:colorDisplay}}
          >
            New Quote
          </button>
        </footer>
      </div>
    );
  }
}

export default RandomMachine;
