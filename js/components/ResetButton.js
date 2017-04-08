import snabbdom from 'snabbdom'

let patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default
]);

import h from 'snabbdom/h'

function view(component) {
    return h('button', {on: {click: clickHandler.bind(null, component)}}, 'Reset');
}

function clickHandler(component) {
    let resetCountEvent = {
        channel: "sync",
        topic: "component.reset.count",
        eventType: 'click',
        data: {}
    };

    component.publish(resetCountEvent);
}

export default class ResetButton {
    constructor(container, eventStore) {
        this.container = container;
        this.eventStore = eventStore;
        this.subscriptions = {};
    }

    publish(event) {
        this.eventStore.add(event);
    }

    getSubscriptions() {
        return this.subscriptions;
    }

    render() {
       return patch(this.container, view(this));
    }
}