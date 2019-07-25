import { mount, createLocalVue } from '@vue/test-utils'
import { DynamicReactiveRefs } from '../src'

const localVue = createLocalVue()
localVue.use(DynamicReactiveRefs)

describe('Reactive Refs with Proxy', () => {
  it('is reactive for a simple ref', () => {
    const spy = jest.fn()
    const wrapper = mount(
      {
        template: `
    <div>
      <button ref="button" :key="n">Hey</button>
    </div>
    `,
        data: () => ({ n: 0 }),
        computed: {
          buttonRef() {
            // @ts-ignore
            return this.$refs.button
          },
        },

        mounted() {
          // @ts-ignore
          this.$watch('$refs.button', spy)
        },
      },
      { localVue }
    )

    expect(wrapper.vm.$refs.button).toEqual(
      wrapper.find({ ref: 'button' }).element
    )
    // @ts-ignore
    expect(wrapper.vm.buttonRef).toEqual(
      wrapper.find({ ref: 'button' }).element
    )

    expect(spy).toHaveBeenCalledTimes(0)

    // @ts-ignore
    wrapper.vm.n++

    expect(wrapper.vm.$refs.button).toEqual(
      wrapper.find({ ref: 'button' }).element
    )
    // @ts-ignore
    expect(wrapper.vm.buttonRef).toEqual(
      wrapper.find({ ref: 'button' }).element
    )

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('works when reading the ref before it is setted', () => {
    const spy = jest.fn()
    const wrapper = mount(
      {
        template: `
    <div>
      <button v-if="n > 0" ref="button" :key="n">Hey</button>
    </div>
    `,
        data: () => ({ n: 0 }),
        computed: {
          buttonRef() {
            // @ts-ignore
            return this.$refs.button
          },
        },

        mounted() {
          // @ts-ignore
          this.$watch('$refs.button', spy)
        },
      },
      { localVue }
    )

    expect(wrapper.vm.$refs.button).toEqual(undefined)
    // @ts-ignore
    expect(wrapper.vm.buttonRef).toEqual(undefined)

    expect(spy).toHaveBeenCalledTimes(0)

    // @ts-ignore
    wrapper.vm.n++

    expect(wrapper.vm.$refs.button).toEqual(
      wrapper.find({ ref: 'button' }).element
    )
    // @ts-ignore
    expect(wrapper.vm.buttonRef).toEqual(
      wrapper.find({ ref: 'button' }).element
    )

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
