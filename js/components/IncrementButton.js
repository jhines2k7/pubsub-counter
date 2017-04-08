//let snabbdom = require('snabbdom');
import snabbdom from 'snabbdom'

let patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default
]);

//let h = require('snabbdom/h').default; // helper function for creating vnodes
import h from 'snabbdom/h'

import postal from 'postal/lib/postal.lodash'

function view(eventStore) {
    return h('button', {on: {click: clickHandler.bind(null, 1, eventStore)}}, 'Increment');
}

function clickHandler(amount, eventStore) {
    let incrementCountByOneEvent = {
        channel: "sync",
        topic: "component.increment.count",
        eventType: 'click',
        data: {
            amount: amount
        }
    };

    eventStore.add(incrementCountByOneEvent);
}

function updateDOM(container, newVnode) {
    return patch(container, newVnode);
}

export default class ButtonComponent {
    constructor(container, eventStore) {
        this.container = container;
        this.eventStore = eventStore;
        this.subscriptions = {};
    }

    publish(event) {
        postal.publish(event);
        this.eventStore.add(event);
    }

    getSubscriptions() {
        return this.subscriptions;
    }

    render() {
        const newVnode = view(this.eventStore);
        this.container = updateDOM(this.container, newVnode);

        return this.container;
    }
}