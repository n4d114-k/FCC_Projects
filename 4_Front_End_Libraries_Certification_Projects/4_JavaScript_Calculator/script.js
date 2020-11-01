const initialState = {
  display: 0,
  operationFlag: false,
  operationType: null,
  storedValue: null
};
let lastOperand = undefined;

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  numberBtnClicked(value) {
    if (this.state.operationType == '=') {
      if (value != '.') {
        this.setState({
          display: value,
          operationType: null,
          operationFlag: false
        });
      } else {
        this.setState({
          display: '0.',
          operationType: null,
          operationFlag: false
        });
      }

      return;
    } else if (!this.state.operationFlag) {
      switch (this.state.display) {
        case 0:
          if (value != '.') {
            this.setState({
              display: value
            });
          } else if (value == '.' && !this.state.display.toString().includes('.')) {
            this.setState({
              display: '0.'
            });
          }

          break;

        default:
          if (value != '.' && !this.state.display.toString().includes('.')) {
            let stringValue = this.state.display.toString() + value.toString();
            let newValue = Number.parseFloat(stringValue);
            this.setState({
              display: newValue
            });
          } else if (value == '.' && !this.state.display.toString().includes('.')) {
            let stringValue = this.state.display.toString() + value.toString();
            this.setState({
              display: stringValue
            });
          } else if (value == 0 && this.state.display.toString().includes('.')) {
            let stringValue = this.state.display.toString() + '0';
            this.setState({
              display: stringValue
            });
          } else if (value != '.') {
            let stringValue = this.state.display.toString() + value.toString();
            let newValue = Number.parseFloat(stringValue);
            this.setState({
              display: newValue
            });
          }

          break;
      }
    } else {
      switch (value) {
        case '.':
          break;

        default:
          let storedValue = Number.parseFloat(this.state.display.toString());
          this.setState({
            storedValue: storedValue,
            operationFlag: false,
            display: value
          });
          break;
      }
    }
  }

  operationBtnClicked(value) {
    if (value === '-' && this.state.operationFlag == true) {
      lastOperand = this.state.operationType;
    } else if (value == '=') {
      if (lastOperand != undefined) {
        this.state = {
          display: 0 - this.state.display,
          operationFlag: this.state.operationFlag,
          operationType: lastOperand,
          storedValue: this.state.storedValue
        };
        lastOperand = undefined;
      }

      let result = this.compute();
      this.setState({
        display: result,
        storedValue: result,
        operationFlag: true,
        operationType: value
      });
    } else if (!this.state.operationFlag && this.state.storedValue != null) {
      let result = this.compute();
      if (result != undefined) this.setState({
        display: result,
        storedValue: result
      });
      this.setState({
        operationFlag: true,
        operationType: value
      });
    } else {
      this.setState({
        operationType: value,
        operationFlag: true
      });
      lastOperand = undefined;
    }
  }

  compute() {
    if (this.state.display != undefined) {
      let secondValue = Number.parseFloat(this.state.display.toString());

      switch (this.state.operationType) {
        case '+':
          var newValue = Number.parseFloat((this.state.storedValue + secondValue).toFixed(7));
          return newValue;

        case '-':
          var newValue = Number.parseFloat((this.state.storedValue - secondValue).toFixed(7));
          return newValue;
          break;

        case 'x':
          var newValue = Number.parseFloat((this.state.storedValue * secondValue).toFixed(7));
          return newValue;

        case '÷':
          var newValue = Number.parseFloat((this.state.storedValue / secondValue).toFixed(7));
          return newValue;
      }
    }
  }

  actionBtnClicked(value) {
    switch (value) {
      case 'AC':
        this.setState({
          display: 0,
          storedValue: null,
          operationType: null,
          operationFlag: false
        });
        break;

      case 'DEL':
        let newVal = Number.parseFloat(this.state.display.toString().slice(0, -1));
        this.setState({
          display: newVal
        });
        if (isNaN(newVal)) this.setState({
          display: 0
        });
        break;

      case 'negative':
        {
          if (this.state.display != 0) {
            this.setState({
              display: 0 - this.state.display
            });
          }
        }
    }
  }

  render() {
    return React.createElement("div", {
      id: "appWrapper"
    }, React.createElement("div", {
      id: "calculator-grid"
    }, React.createElement("div", {
      id: "display"
    }, this.state.display), React.createElement("div", {
      id: "inputWrapper"
    }, React.createElement("button", {
      id: "clear",
      className: "all-clear",
      onClick: () => {
        this.actionBtnClicked('AC');
      }
    }, "AC"), React.createElement("button", {
      id: "delete",
      className: "delete",
      onClick: () => {
        this.actionBtnClicked('DEL');
      }
    }, "DEL"), React.createElement("button", {
      id: "negative",
      className: "negative",
      onClick: () => {
        this.actionBtnClicked('negative');
      }
    }, "\xB1"), React.createElement("button", {
      id: "divide",
      onClick: () => {
        this.operationBtnClicked('÷');
      }
    }, "\xF7"), React.createElement("button", {
      id: "seven",
      className: "number",
      onClick: () => {
        this.numberBtnClicked(7);
      }
    }, "7"), React.createElement("button", {
      id: "eight",
      className: "number",
      onClick: () => {
        this.numberBtnClicked(8);
      }
    }, "8"), React.createElement("button", {
      id: "nine",
      className: "number",
      onClick: () => {
        this.numberBtnClicked(9);
      }
    }, "9"), React.createElement("button", {
      id: "multiply",
      onClick: () => {
        this.operationBtnClicked('x');
      }
    }, "x"), React.createElement("button", {
      id: "four",
      className: "number",
      onClick: () => {
        this.numberBtnClicked(4);
      }
    }, "4"), React.createElement("button", {
      id: "five",
      className: "number",
      onClick: () => {
        this.numberBtnClicked(5);
      }
    }, "5"), React.createElement("button", {
      id: "six",
      className: "number",
      onClick: () => {
        this.numberBtnClicked(6);
      }
    }, "6"), React.createElement("button", {
      id: "subtract",
      onClick: () => {
        this.operationBtnClicked('-');
      }
    }, "-"), React.createElement("button", {
      id: "one",
      className: "number",
      onClick: () => {
        this.numberBtnClicked(1);
      }
    }, "1"), React.createElement("button", {
      id: "two",
      className: "number",
      onClick: () => {
        this.numberBtnClicked(2);
      }
    }, "2"), React.createElement("button", {
      id: "three",
      className: "number",
      onClick: () => {
        this.numberBtnClicked(3);
      }
    }, "3"), React.createElement("button", {
      id: "add",
      onClick: () => {
        this.operationBtnClicked('+');
      }
    }, "+"), React.createElement("button", {
      id: "zero",
      className: "span-two number corner4",
      onClick: () => {
        this.numberBtnClicked(0);
      }
    }, "0"), React.createElement("button", {
      id: "decimal",
      className: "decimal number",
      onClick: () => {
        this.numberBtnClicked('.');
      }
    }, "."), React.createElement("button", {
      id: "equals",
      className: "operator corner3",
      onClick: () => {
        this.operationBtnClicked('=');
      }
    }, "="))));
  }

}

ReactDOM.render( React.createElement(App, null), document.getElementById("root"));
