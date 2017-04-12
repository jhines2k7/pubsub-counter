let snabbdom = require('snabbdom');

let patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
]);

let h = require('snabbdom/h').default; // helper function for creating vnodes

import postal from 'postal/lib/postal.lodash'

function view(component) {
    return h('button', {on: {click: clickHandler.bind(null, 1, component)}}, 'Decrement');
}

function clickHandler(amount, component) {
    let incrementCountByAmountEvent = {
        channel: "sync",
        topic: "component.decrement.count",
        eventType: 'click',
        data: {
            amount: amount
        }
    };

    component.publish(incrementCountByAmountEvent);
}

export default class ButtonComponent {
    constructor(container, eventStore) {
        this.container = container;
        this.eventStore = eventStore;
    }

    publish(event) {
        postal.publish(event);
        this.eventStore.push(event);
    }

    render() {
        return patch(this.container, view(this));
    }
}