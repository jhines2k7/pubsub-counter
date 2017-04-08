let snabbdom = require('snabbdom');

let patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
]);

let h = require('snabbdom/h').default; // helper function for creating vnodes

import postal from 'postal/lib/postal.lodash'

function view(state) {
    "use strict";

    return h('h1', '1');
}

function updateDom(container, newVnode) {
    "use strict";

    return patch(container, newVnode);
}

export default class CounterView {
    constructor(container, eventStore) {
        this.eventStore = eventStore;
        this.container = container;
        this.subscriptions = {};
    }

    subscribe(channel, topic) {
        let subscription = postal.subscribe({
            channel: channel,
            topic: topic,
            callback: function(data, envelope) {
                /*let events = this._eventStore.filter(this._subscriptions);

                 let reducedState = this.reduce(events);

                 this.render(reducedState);*/
            }.bind(this)
        });

        this.subscriptions[topic] = subscription;

        return subscription;
    }

    publish(event) {
        postal.publish(event);
        this._eventStore.add(event);
    }

    getSubscriptions() {
        return this._subscriptions;
    }

    getEventStore() {
        return this._eventStore;
    }

    render(state) {
        const newVnode = view(state, this);
        this.container = updateDom(this.container, newVnode);

        return this.container;
    }
}
