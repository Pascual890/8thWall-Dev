import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'boton-video',
  schema: {
    reproductorVideo: ecs.eid,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    const setPausado = (pausado: boolean) => {
      // Leemos el eid del video en el momento del evento, no antes
      const {reproductorVideo} = schemaAttribute.get(eid)
      const controles = ecs.VideoControls.get(world, reproductorVideo)

      if (!controles) {
        console.error('No se encontró el reproductor de video en el plano asignado')
        return
      }

      ecs.VideoControls.mutate(world, reproductorVideo, (c) => {
        c.paused = pausado
        return false
      })
    }

    ecs.defineState('pausado')
      .initial()
      .onEnter(() => {
        setPausado(true)
        ecs.Hidden.remove(world, eid) // se muestra el botón "Reproducir"
      })
      .onEvent(ecs.input.SCREEN_TOUCH_START, 'reproduciendo')

    ecs.defineState('reproduciendo')
      .onEnter(() => {
        setPausado(false)
        ecs.Hidden.set(world, eid) // se oculta el botón
      })
      .onEvent(ecs.input.SCREEN_TOUCH_START, 'pausado')
  },
})