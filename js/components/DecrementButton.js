let snabbdom = require('snabbdom');

let patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
]);

let h = require('snabbdom/h').default; // helper function for creating vnodes

import postal from 'postal/lib/postal.lodash'

function view() {
    return h('button', 'Decrement');
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
        this.eventStore.push(event);
    }

    getSubscriptions() {
        return this.subscriptions;
    }

    render() {
        const newVnode = view();
        this.container = updateDOM(this.container, newVnode);

        return this.container;
    }
}