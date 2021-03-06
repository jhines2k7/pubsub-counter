import EventStore from './EventStore'
import IncrementButton from './components/IncrementButton'
import DecrementButton from './components/DecrementButton'
import ResetButton from './components/ResetButton'
import CounterView from './components/CounterView'

let eventStore = new EventStore();

let container = document.getElementById('increment');
let incrementBtn = new IncrementButton(container, eventStore);

container = document.getElementById('decrement');
let decrementBtn = new DecrementButton(container, eventStore);

container = document.getElementById('reset');
let resetBtn = new ResetButton(container, eventStore);

container = document.getElementById('counter-view');
let counterView = new CounterView(container, eventStore);
counterView.subscribe('sync', 'component.increment.count');
counterView.subscribe('sync', 'component.decrement.count');
counterView.subscribe('sync', 'component.reset.count');

incrementBtn.render();
decrementBtn.render();
resetBtn.render();
counterView.render({count: 0});