import EventStore from './EventStore'
import IncrementButton from './components/IncrementButton'
import DecrementButton from './components/DecrementButton'
import CounterView from './components/CounterView'

let eventStore = new EventStore();

let container = document.getElementById('increment');
let incrementBtn = new IncrementButton(container, eventStore);

container = document.getElementById('decrement');
let decrementBtn = new DecrementButton(container, eventStore);

container = document.getElementById('counter-view');
let counterView = new CounterView(container, eventStore);
counterView.subscribe('initialize', 'component.initialize.counterView');
counterView.subscribe('sync', 'component.increment.count');

incrementBtn.render();
decrementBtn.render();
counterView.render({});