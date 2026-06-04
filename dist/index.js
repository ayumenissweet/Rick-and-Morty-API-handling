"use strict";
function emitEvent(event, payload) {
    //do your things here!
    return {};
}
const output = emitEvent("start-process", {
    id: 69,
    processName: "cleanup",
    start_time: 12,
    status: "Pending",
});
output.success; //typescript is smart enough to know the return output here
//this function is used to narrow what is the type the user wants
function statusCheck(event) {
    switch (event.type) {
        //type script auto completes here
        case "start-process":
            console.log(
            //typescript auto completes here too
            `Process Started at ${event.payload.start_time}, status : ${event.payload.status}`);
            break;
        case "login":
            console.log(`User logged in successly, username : ${event.payload.user}`);
            break;
        case "send":
            console.log(`Transaction Succesful : ${event.payload.amount}${event.payload.currency} sent from ${event.payload.src_country} to ${event.payload.dst_country}`);
            break;
        case "receive":
            console.log(`Transaction Succesful : ${event.payload.amount}${event.payload.currency} received from ${event.payload.src_country} to ${event.payload.dst_country}`);
            break;
        default:
            console.log("Unrecognizable Event");
    }
}
function eventListen(events) {
    for (const event of events) {
        const information = emitEvent(event.type, event.payload);
        console.log(information);
        statusCheck(event);
    }
}
