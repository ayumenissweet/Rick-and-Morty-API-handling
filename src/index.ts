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
  send: {};
  receive: {};
  "start-process": {};
  login: {};
}>;
function emitEvent<T extends EventTypes>(
  event: T,
  payload: PayloadMap[T],
): ReturnMap[T] {
  return {} as ReturnMap;
}

emitEvent("start-process", {
  id: 111,
  processName: "Google",
  start_time: 10000,
  status: "Pending",
});

function statusCheck(event: any): void /* this only display stuff */ {
  //check all actions that are using that event and display them...
}
