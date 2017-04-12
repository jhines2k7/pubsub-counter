import snabbdom from 'snabbdom'

let patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default
]);

import h from 'snabbdom/h'

function view(component) {
    return h('button', {on: {click: clickHandler.bind(null, 1, component)}}, 'Increment');
}

function clickHandler(amount, component) {
    let incrementCountByAmountEvent = {
        channel: "sync",
        topic: "component.increment.count",
        eventType: 'click',
        data: {
            amount: amount
        }
    };

    component.publish(incrementCountByAmountEvent);
}

export default class ResetButton {
    constructor(container, eventStore) {
        this.container = container;
        this.eventStore = eventStore;
    }

    publish(event) {
        this.eventStore.add(event);
    }

    render() {
        return patch(this.container, view(this));
    }
}