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

    return h('h1', state.count);
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
                let events = this.eventStore.filter(this.subscriptions);

                let reducedState = this.reduce(events);

                this.render(reducedState);
            }.bind(this)
        });

        this.subscriptions[topic] = subscription;

        return subscription;
    }

    publish(event) {
        this.eventStore.add(event);
    }

    getSubscriptions() {
        return this.subscriptions;
    }

    getEventStore() {
        return this.eventStore;
    }

    render(state) {
        const newVnode = view(state);
        this.container = updateDom(this.container, newVnode);

        return this.container;
    }

    reduce(events) {
        return events.reduce(function(state, event) {
            if(event.topic === 'component.reset.count') {
                state.count = 0;

                return state;
            }

            if (event.topic === 'component.increment.count') {
                state.count += event.data.amount;

                return state;
            }

            if(event.topic === 'component.decrement.count') {
                state.count -= event.data.amount;

                return state;
            }

        }, {
            count: 0
        });
    }
}
