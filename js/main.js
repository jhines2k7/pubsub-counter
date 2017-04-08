import EventStore from './EventStore'
import IncrementButton from './components/IncrementButton'
import DecrementButton from './components/DecrementButton'

let eventStore = new EventStore();

let container = document.getElementById('increment');
let incrementBtn = new IncrementButton(container, eventStore);

container = document.getElementById('decrement');
let decrementBtn = new DecrementButton(container, eventStore);

incrementBtn.render();
decrementBtn.render();
