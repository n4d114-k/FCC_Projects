function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PLAY = "fas fa-play";
const PAUSE = "fas fa-pause";
const RESET = "fas fa-undo";
const INCREMENT = "fas fa-plus";
const DECREMENT = "fas fa-minus";
const BEEP = "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3";
const BREAK = 5;
const SESSION = 25;
const DEFAULT = {
  break: BREAK,
  session: SESSION,
  currentInterval: "Session",
  currentDuration: SESSION * 60,
  counting: false
};

class Clock extends React.Component {
  constructor() {
    super();

    _defineProperty(this, "componentDidMount", () => {
      this.audio = document.getElementById("beep");
    });

    _defineProperty(this, "handleClick", event => {
      const element = event.target.id;

      switch (element) {
        case "start_stop":
        case "reset":
          this.toggleTimer(element);
          break;

        case "break-increment":
        case "break-decrement":
        case "session-increment":
        case "session-decrement":
          this.toggleLength(element);
          break;
      }
    });

    _defineProperty(this, "toggleTimer", element => {
      switch (element) {
        case "start_stop":
          this.toggleStartStop();
          break;

        case "reset":
          this.audio.pause();
          this.audio.currentTime = 0;

          if (this.timerId) {
            clearInterval(this.timerId);
          }

          this.setState(DEFAULT);
          break;
      }
    });

    _defineProperty(this, "toggleStartStop", () => {
      if (this.state.counting) {
        clearInterval(this.timerId);
        this.setState({
          counting: false
        });
      } else {
        this.setState({
          counting: true
        });
        this.timerId = setInterval(this.tick, 1000);
      }
    });

    _defineProperty(this, "tick", () => {
      const currentDuration = this.state.currentDuration;

      if (!currentDuration) {
        this.changeInterval();
      } else {
        const newDuration = currentDuration - 1;

        if (newDuration === 0) {
          let count = 0;

          this.audio.onended = () => {
            if (count < 2) {
              count++;
              this.audio.play();
            }
          };

          this.audio.play();
        }

        this.setState({
          currentDuration: newDuration
        });
      }
    });

    _defineProperty(this, "changeInterval", () => {
      const newInterval = this.state.currentInterval === "Session" ? "Break" : "Session";
      const newDuration = this.state[newInterval.toLowerCase()] * 60;
      this.setState({
        currentInterval: newInterval,
        currentDuration: newDuration
      });
    });

    _defineProperty(this, "toggleLength", element => {
      if (!this.state.counting) {
        const interval = element.split("-")[0];
        const change = element.split("-")[1];
        const currentDuration = this.state[interval];
        let newDuration;

        if (change === "increment" && currentDuration < 60) {
          newDuration = currentDuration + 1;
        } else if (change === "decrement" && currentDuration > 1) {
          newDuration = currentDuration - 1;
        } else {
          newDuration = currentDuration;
        }

        let newState = {};
        newState[interval] = newDuration;

        if (this.state.currentInterval === interval[0].toUpperCase() + interval.slice(1)) {
          newState.currentDuration = newDuration * 60;
        }

        this.setState(newState);
      }
    });

    this.state = DEFAULT;
  }

  render() {
    return React.createElement("div", {
      id: "clock"
    }, React.createElement("h1", null, "25 + 5 Clock"), React.createElement("div", {
      className: "setter-container"
    }, React.createElement(Setter, {
      setType: "break",
      length: this.state.break,
      onClick: this.handleClick
    }), React.createElement(Setter, {
      setType: "session",
      length: this.state.session,
      onClick: this.handleClick
    })), React.createElement(Timer, {
      currentInterval: this.state.currentInterval,
      currentDuration: this.state.currentDuration
    }), React.createElement("div", {
      className: "timerButton-container"
    }, React.createElement(TimerButton, {
      buttonType: "start_stop",
      onClick: this.handleClick,
      counting: this.state.counting
    }), React.createElement(TimerButton, {
      buttonType: "reset",
      onClick: this.handleClick,
      counting: this.state.counting
    })), React.createElement("audio", {
      id: "beep",
      src: BEEP,
      preload: "auto"
    }));
  }

}

const Timer = props => {
  const minutes = Math.floor(props.currentDuration / 60).toString().padStart(2, "0");
  const seconds = (props.currentDuration % 60).toString().padStart(2, "0");
  return React.createElement("div", {
    id: "timer"
  }, React.createElement("h2", {
    id: "timer-label"
  }, props.currentInterval), React.createElement("time", {
    id: "time-left"
  }, minutes, ":", seconds));
};

const TimerButton = props => {
  const icon = props.buttonType === "start_stop" ? props.counting ? PAUSE : PLAY : RESET;
  return React.createElement("i", {
    id: props.buttonType,
    className: icon,
    onClick: props.onClick
  });
};

const Setter = props => {
  const labelId = `${props.setType}-label`;
  const label = `${props.setType[0].toUpperCase() + props.setType.slice(1)} Length`;
  const lengthId = `${props.setType}-length`;
  const length = props.length;
  const incrementId = `${props.setType}-increment`;
  const decrementId = `${props.setType}-decrement`;
  return React.createElement("div", {
    className: "setter"
  }, React.createElement("h2", {
    id: labelId
  }, label), React.createElement(SetButton, {
    buttonId: decrementId,
    onClick: props.onClick
  }), React.createElement("span", {
    id: lengthId
  }, length), React.createElement(SetButton, {
    buttonId: incrementId,
    onClick: props.onClick
  }));
};

const SetButton = props => {
  const icon = props.buttonId.split("-")[1] === "increment" ? INCREMENT : DECREMENT;
  return React.createElement("i", {
    id: props.buttonId,
    className: icon,
    onClick: props.onClick
  });
};

ReactDOM.render( React.createElement(Clock, null), document.getElementById("root"));
