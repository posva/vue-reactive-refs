/**
 * Because this version uses a Proxy, it will fail on any browser that does not
 * support it
 */

import { PluginFunction } from 'vue'

export const DynamicReactiveRefs: PluginFunction<never> = _Vue => {
  _Vue.mixin({
    beforeCreate() {
      const $refs = _Vue.observable({})
      // @ts-ignore
      this.$refs = new Proxy($refs, {
        set(target, key, value) {
          if (!(key in target)) _Vue.set($refs, key as string, value)
          return Reflect.set(target, key, value)
        },
        get(target, key) {
          if (!(key in target)) _Vue.set($refs, key as string, undefined)
          return Reflect.get(target, key)
        },
      })
    },
  })
}
