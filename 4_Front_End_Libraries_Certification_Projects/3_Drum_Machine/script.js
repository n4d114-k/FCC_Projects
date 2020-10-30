const buttons = [{ name: "Q", id: "Heater-1",
                   url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
                 { name: "W", id: "Heater-2",
                   url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
                 { name: "E", id: "Heater-3",
                   url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
                 { name: "A", id: "Heater-4",
                   url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
                 { name: "S", id: "Clap",
                   url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
                 { name: "D", id: "Open-HH",
                   url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
                 { name: "Z", id: "Kick-n'-Hat",
                   url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
                 { name: "X", id: "Kick",
                   url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
                 { name: "C", id: "Closed-HH",
                   url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }];

function Button({
  id,
  name,
  url,
  handleChange
}) {
  const audio = React.useMemo(() => ({}), []);
  audio[name] = React.useRef();
  const playAudio = React.useCallback(audio => {
    audio.current.currentTime = 0;
    audio.current.play();
  }, []);
  const handlePlay = React.useCallback(() => {
    playAudio(audio[name]);
    handleChange(id);
  }, [audio, handleChange, id, name, playAudio]);
  const handlePress = React.useCallback(evt => {
    console.log(evt.key);

    if (evt.key.toUpperCase() === name || evt.key === name) {
      handlePlay();
    }
  }, [name, handlePlay]);
  React.useEffect(() => {
    document.addEventListener("keydown", handlePress);
    return () => {
      document.removeEventListener("keydown", handlePress);
    };
  }, [handlePress]);
  return React.createElement("button", {
    className: "drum-pad",
    id: id,
    type: "button",
    onClick: handlePlay
  }, React.createElement("audio", {
    ref: audio[name],
    className: "clip",
    id: name,
    src: url
  }), name);
}

function Keyboard({
  handleChange
}) {
  return React.createElement("div", {
    id: "keyboard"
  }, buttons.map(el => React.createElement(Button, {
    key: el.id,
    id: el.id,
    name: el.name,
    url: el.url,
    handleChange: handleChange
  })));
}

function Screen({
  value
}) {
  return React.createElement("div", {
    id: "display",
    className: "screen-container"
  }, React.createElement("div", {
    className: "screen"
  }, value));
}

function App() {
  const [name, setName] = React.useState("");

  const handleChange = value => {
    setName(value);
  };

  return React.createElement("div", {
    id: "drum-machine"
  }, React.createElement(Screen, {
    value: name
  }), React.createElement(Keyboard, {
    handleChange: handleChange
  }));
}

ReactDOM.render( React.createElement(React.StrictMode, null, React.createElement(App, null)), document.getElementById("root"));
