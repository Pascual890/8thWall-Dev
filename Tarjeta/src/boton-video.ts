import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'boton-video',
  schema: {
    reproductorVideo: ecs.eid, 
  },
  add: (world, component) => {
    const { reproductorVideo } = component.schema

    // Esta es la función que se ejecutará al tocar
    const alternarVideo = () => {
      console.log("¡Botón presionado!") // Mensaje de prueba
      
      const controles = ecs.VideoControls.get(world, reproductorVideo)
      
      if (controles) {
        ecs.VideoControls.mutate(world, reproductorVideo, (c) => {
          c.paused = !c.paused
          console.log("Estado del video pausado:", c.paused)
        })
      } else {
        console.error("No se encontró el reproductor de video en el plano asignado")
      }
    }

    // Escuchamos los toques (en PC y en móvil)
    world.events.addListener(component.eid, 'pointerdown', alternarVideo)
    world.events.addListener(component.eid, 'click', alternarVideo)
  }
})