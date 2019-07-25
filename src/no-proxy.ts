import Vue, { PluginFunction } from 'vue'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    refs?: string[]
  }
}

export const ReactiveRefs: PluginFunction<never> = _Vue => {
  _Vue.mixin({
    beforeCreate() {
      const { refs } = this.$options
      if (!refs) return
      // @ts-ignore
      this.$refs = _Vue.observable(
        refs.reduce(
          ($refs, key) => {
            $refs[key] = null
            return $refs
          },
          {} as Record<string, Vue | Element | Vue[] | Element[] | null>
        )
      )
    },
  })
}
