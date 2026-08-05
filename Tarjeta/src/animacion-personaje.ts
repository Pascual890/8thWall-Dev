import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'animacion-personaje',
  schema: {
    animIdle: ecs.string,
    animBaile: ecs.string,
  },
  schemaDefaults: {
    animIdle: 'idle',
    animBaile: 'baile',
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    const setClip = (clipName: string) => {
      ecs.GltfModel.mutate(world, eid, (cursor) => {
        cursor.animationClip = clipName
        return false // false = sí hubo cambios, hay que confirmar
      })
    }

    ecs.defineState('idle')
      .initial()
      .onEnter(() => {
        const {animIdle} = schemaAttribute.get(eid)
        setClip(animIdle)
      })
      .onEvent(ecs.input.SCREEN_TOUCH_START, 'baile')

    ecs.defineState('baile')
      .onEnter(() => {
        const {animBaile} = schemaAttribute.get(eid)
        setClip(animBaile)
      })
      .onEvent(ecs.input.SCREEN_TOUCH_START, 'idle')
  },
})