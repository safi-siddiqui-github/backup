// Events
// In js the system produces or fires a signal of some kind when an event occurs
// on every event an action takes place
// events are fired through browser
// in order to react to an event, we need to attach event-handler
// event-handler / event-listener can be any function
// registering an event handler, when a block of code is defined to run in response of an event 

// events
// click, focus, blur, dbclick

// let btn = document.querySelector('button')
// function eventListener(){
//     console.log('btn clicked');
// }
// btn.addEventListener('click', eventListener)
// btn.removeEventListener("click", eventListener);

// Inline-Event-Handlers // dont use them

// Event Objects
// optional parameter that is sent to event listener to provide extra information

// Event Bubbling
// consider a button inside div which is inside body
// if add eventListener to all three, and just click on the button
// all three events are run knwon as bubbling
// event bubbles up from inner most element
// in order to fix this use event.stopPropagation(); in event listener of inner most element

// Event Capture
// same as event bubbling, reveresed form 
// document.body.addEventListener("click", handleClick, { capture: true });
// container.addEventListener("click", handleClick, { capture: true });
// button.addEventListener("click", handleClick);