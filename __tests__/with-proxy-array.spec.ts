import { mount, createLocalVue } from '@vue/test-utils'
import { DynamicReactiveRefs } from '../src'

const localVue = createLocalVue()
localVue.use(DynamicReactiveRefs)

describe('Reactive Refs with Proxy', () => {
  // for some reason this fails when run along other tests but works when run alone
  it('it works with arrays', async () => {
    const spy = jest.fn()
    const wrapper = mount(
      {
        template: `
    <div>
      <p v-for="i in n" ref="buttons" :key="i">Hey</p>
    </div>
    `,
        data: () => ({ n: 5 }),
        computed: {
          buttonsRef() {
            // @ts-ignore
            return this.$refs.buttons
          },
        },

        mounted() {
          // @ts-ignore
          this.$watch('$refs.buttons', spy)
        },
      },
      { localVue }
    )

    expect(wrapper.vm.$refs.buttons).toHaveLength(5)
    // @ts-ignore
    expect(wrapper.vm.buttonsRef).toHaveLength(5)

    expect(spy).toHaveBeenCalledTimes(0)

    // @ts-ignore
    wrapper.vm.n = 3

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$refs.buttons).toHaveLength(3)
    // @ts-ignore
    expect(wrapper.vm.buttonsRef).toHaveLength(3)

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
