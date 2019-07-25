const reactiveRefs = {
  beforeCreate() {
    const { refs } = this.$options
    if (!refs) return
    this.$refs = Vue.observable(
      refs.reduce(($refs, key) => {
        $refs[key] = null
        return $refs
      }, {})
    )
  },
}

const dynamicReactiveRefs = {
  beforeCreate() {
    const $refs = Vue.observable({})
    this.$refs = new Proxy($refs, {
      set(target, key, value) {
        if (!(key in target)) Vue.set($refs, key, value)
        return Reflect.set(target, key, value)
      },
      get(target, key) {
        if (!(key in target)) Vue.set($refs, key, null)
        return Reflect.get(target, key)
      },
    })
  },
}