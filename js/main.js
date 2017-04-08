import EventStore from './EventStore'
import ButtonComponent from './components/ButtonComponent'

let eventStore = new EventStore();

let container = document.getElementById('button');
let incrementBtn = new ButtonComponent(container, eventStore);

incrementBtn.render();
