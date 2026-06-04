type EventTypes = "send" | "receive" | "start-process" | "login";
type EventMap<T extends Record<EventTypes, any>> = T;

type PayloadMap = EventMap<{
  send: {
    src_country: string;
    dst_country: string;
    amount: number;
    currency: string;
  };
  receive: {
    src_country: string;
    dst_country: string;
    amount: number;
    currency: string;
  };
  "start-process": {
    id: number;
    processName: string;
    start_time: number;
    status: "Pending" | "Faillure" | "Success";
  };
  login: {
    user: string;
    password: string;
  };
}>;
type ReturnMap = EventMap<{
  send: { token: string };
  receive: { confirmed: boolean };
  "start-process": { success: boolean };
  login: { token: string };
}>;
function emitEvent<T extends EventTypes>(
  event: T,
  payload: PayloadMap[T],
): ReturnMap[T] {
  //do your things here!
  return {} as ReturnMap[T];
}

type AppEvent = {
  [K in EventTypes]: {
    type: K;
    payload: PayloadMap[K];
  };
}[EventTypes];

const output = emitEvent("start-process", {
  id: 69,
  processName: "cleanup",
  start_time: 12,
  status: "Pending",
});
output.success; //typescript is smart enough to know the return output here

//this function is used to narrow what is the type the user wants
function statusCheck(event: AppEvent): void {
  switch (event.type) {
    //type script auto completes here
    case "start-process":
      console.log(
        //typescript auto completes here too
        `Process Started at ${event.payload.start_time}, status : ${event.payload.status}`,
      );
      break;
    case "login":
      console.log(`User logged in successly, username : ${event.payload.user}`);
      break;
    case "send":
      console.log(
        `Transaction Succesful : ${event.payload.amount}${event.payload.currency} sent from ${event.payload.src_country} to ${event.payload.dst_country}`,
      );
      break;
    case "receive":
      console.log(
        `Transaction Succesful : ${event.payload.amount}${event.payload.currency} received from ${event.payload.src_country} to ${event.payload.dst_country}`,
      );
      break;
    default:
      console.log("Unrecognizable Event");
  }
}

function eventListen(events: AppEvent[]) {
  for (const event of events) {
    const information = emitEvent(event.type, event.payload);
    console.log(information);
    statusCheck(event);
  }
}
