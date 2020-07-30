import {EventEmitter} from "events"

const event = new EventEmitter();

event.on("testEvent", (obj) => {
  console.log(obj);
});

event.emit("testEvent", "Barracuda");