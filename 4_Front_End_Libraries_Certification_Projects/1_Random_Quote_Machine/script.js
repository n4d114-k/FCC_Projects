function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class QuoteMachine extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      newQuote: '',
      author: '' });_defineProperty(this, "generateQuote",

    () => {
      fetch('https://api.quotable.io/random').
      then(response => response.json()).
      then(data => {
        this.setState({ newQuote: data.content, author: data.author });
      });
    });}componentDidMount() {this.generateQuote();}
  render() {
    return (
      React.createElement("div", { class: "container" },
      React.createElement("div", { id: "quote-box" },
      React.createElement("h1", { id: "text" }, this.state.newQuote),
      React.createElement("p", { id: "author" }, this.state.author),
      React.createElement("button", { id: "new-quote", onClick: this.generateQuote }, "Generate New Quote"),
      React.createElement("a", { id: "tweet-quote", href: `https://twitter.com/intent/tweet?text=${this.state.newQuote} ${this.state.author}`, target: "_blank" }, React.createElement("i", { className: "fa fa-twitter" })))));



  }}

ReactDOM.render(React.createElement(QuoteMachine, null), document.getElementById('app'));
