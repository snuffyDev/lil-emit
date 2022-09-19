# lil-emit

> a typed 253 byte event emitter

Yes, another tiny event emitter library.

## Install

```sh
npm  install --save  lil-emit    // npm
pnpm install --save  lil-emit    // pnpm
yarn add             lil-emit    // yarn
```

And then use!

```ts
import { emitter } from "lil-emit";

interface MyEvents {
	click: [number, number];
	update: Record<string, unknown>;
}

// Create our event handler
const ee = emitter<MyEvents>();

const handler = (data) => console.log(data);

// Listen for our events to be fired
// (It's best to avoid using lambda functions for the callback)
ee.on("click", handler);

ee.on("update", handler);

// Dispatch our 'click' event
ee.dispatch("click", [32, 425]);

// Stop listening to the 'click' event
ee.off("click", handler);
// ...or all events
ee.off("*");
```

That's all that's needed!

## Guide

The following guide will reference this event handler function at different points:

```ts
function handler(a, b, c) {
	console.log(a, b, c);
}
```

### `.on(name, callback)`

Registers an event handler for a given name.

#### Callback

The callback has the type `(...data) => void`, where `(...data)` is the data being emitted.
For example:

```ts
ee.on("test", handler);
// or the leaky way
ee.on("test", (a, b, c) => console.log(a, b, c));
```

### `.dispatch(name, ...data)`

Invokes all listeners for the given event name.

To demonstrate, here's how you would dispatch to the example above:

```ts
ee.dispatch("test", "One", "Two", "Three!");
```

### `.off(name, callback)`

Unregisters an event handler from an event.

```ts
// This won't work.
ee.off("test", (a, b, c) => console.log(a, b, c));

// But this will!
ee.off("test", handler);
```

You can also do `.off("*")` to remove all event listeners, from all events.
