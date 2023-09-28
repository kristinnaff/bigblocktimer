import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Timer = ({
  timerActive,
  setTimerActive,
  time,
  setTime,
  task,
  setHeadline,
  setFinishedTasksList,
  finishedTasksList,
}) => {
  if (timerActive) {
    if (time > 0) {
      setInterval(() => setTime(time - 1), 1000);
      if (time === 0) {
        clearInterval();
        console.log("interval cleared");
        debugger;
        let newTasksList = finishedTasksList.concat(task);
        setFinishedTasksList(newTasksList);
        setHeadline(`You finished ${task}`);
        setTimerActive(false);
      }
    }
  }
  return (
    <div>
      <p>{timerActive && `${time} seconds`}</p>
    </div>
  );
};

const Taskform = ({
  task,
  setTask,
  time,
  setTime,
  timerActive,
  setTimerActive,
  headline,
  setHeadline,
}) => {
  const handleTaskChange = (e) => {
    console.log(e.target.value);
    setTask(e.target.value);
  };

  const handleTimeChange = (e) => {
    console.log("time is ", e.target.value * 60 * 60);
    setTime(e.target.value * 60 * 60);
  };

  const setTodo = (task, time) => {
    console.log("setTodo is happening . . . ");
    console.log(`time is ${time}`);
    console.log(`task is ${task}`);
    if (time === 0 || !time) {
      alert(
        "0 hours isn't allowed. Please use decimals for partial hours, like .25 for 15 minutes."
      );
      return false;
    }
    if (task === "" || !task) {
      alert("Can't do the task if we don't know what it is.");
      return false;
    }
    console.log(`doing ${task} for ${time} seconds`);
    setHeadline(task);
    setTimerActive(true);
  };

  return (
    <form>
      <p>
        I want to{" "}
        <input
          type="text"
          placeholder="do something"
          onChange={(e) => handleTaskChange(e)}
        />{" "}
        for{" "}
        <input
          type="number"
          placeholder=".25"
          onChange={(e) => handleTimeChange(e)}
        />{" "}
        hours
      </p>
      {!timerActive && (
        <button onClick={() => setTodo(task, time)} type="button">
          {" "}
          Start!{" "}
        </button>
      )}
      {timerActive && (
        <button onClick={() => setTimerActive(false)} type="button">
          {" "}
          Stop{" "}
        </button>
      )}
    </form>
  );
};

const FinishedTasksList = ({ finishedTasksList }) => {
  if (finishedTasksList.length > 0) {
    return "one";
  } else {
    return "hello";
  }
};

export function App() {
  const [taskObjects, setTaskObjects] = useState([]);
  const [headline, setHeadline] = useState("Let's Make a Plan");
  const [task, setTask] = useState("");
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [finishedTasksList, setFinishedTasksList] = useState([]);

  return (
    <>
      <div>
        <h1> {headline} </h1>
        <Taskform
          {...{
            task,
            setTask,
            time,
            setTime,
            timerActive,
            setTimerActive,
            headline,
            setHeadline,
          }}
        />
        <Timer
          {...{
            timerActive,
            setTimerActive,
            time,
            setTime,
            task,
            headline,
            setHeadline,
            setFinishedTasksList,
            finishedTasksList,
          }}
        />
        <FinishedTasksList {...{ finishedTasksList }} />
      </div>
    </>
  );
}

export default App;
