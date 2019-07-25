# vue-reactive-refs [![Build Status](https://badgen.net/circleci/github/posva/vue-reactive-refs)](https://circleci.com/gh/posva/vue-reactive-refs) [![npm package](https://badgen.net/npm/v/vue-reactive-refs)](https://www.npmjs.com/package/vue-reactive-refs) [![coverage](https://badgen.net/codecov/c/github/posva/vue-reactive-refs)](https://codecov.io/github/posva/vue-reactive-refs) [![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/posva/thanks)

> Make \$refs reactive so they can be used in computed properties and watchers

## Installation

```sh
npm install vue-reactive-refs
```

## Usage

This library exposes two different plugins: `ReactiveRefs` and
`DynamicReactiveRefs`

### `ReactiveRefs`

Supports all browsers but requires you to manually declare `refs` in component
options.

```js
import { ReactiveRefs } from 'vue-reactive-refs'
import Vue from 'vue'

Vue.use(ReactiveRefs)
```

MyComponent.vue

```vue
<template>
  <div>
    <input ref="input" />
    <button v-for="button in actions" ref="buttons">{{ action }}</button>
  </div>
</template>

<script>
export default {
  // this is necessary
  refs: ['input', 'buttons'],

  computed: {
    // NOTE: this is definitely not what you should use this lib for, but it's
    // the easiest example
    inputValue() {
      return this.$refs.input && this.$refs.input.value
    },
    // Same for this example. It's ALWAYS better to mapping your data (the source of truth)
    // and avoid at all cost mapping information to the DOM
    buttonsText() {
      return this.$refs.buttons && this.$refs.buttons.map(b => b.innerText)
    },
  },
}
</script>
```

### `DynamicReactiveRefs`

Supports modern browsers (not IE) [that support
`Proxy`](https://caniuse.com/#search=proxy) and works out of the box:

```js
import { DynamicReactiveRefs } from 'vue-reactive-refs'
import Vue from 'vue'

Vue.use(DynamicReactiveRefs)
```

MyComponent.vue

```vue
<template>
  <div>
    <input ref="input" />
    <button v-for="button in actions" ref="buttons">{{ action }}</button>
  </div>
</template>

<script>
export default {
  computed: {
    // NOTE: this is definitely not what you should use this lib for, but it's
    // the easiest example
    inputValue() {
      return this.$refs.input && this.$refs.input.value
    },
    // Same for this example. It's ALWAYS better to mapping your data (the source of truth)
    // and avoid at all cost mapping information to the DOM
    buttonsText() {
      return this.$refs.buttons && this.$refs.buttons.map(b => b.innerText)
    },
  },
}
</script>
```

## Related

- Vue.js issue: https://github.com/vuejs/vue/issues/3842

## License

[MIT](http://opensource.org/licenses/MIT)
