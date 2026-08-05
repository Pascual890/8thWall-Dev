import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'abrir-link',
  schema: {
    link: ecs.string,
  },
  schemaDefaults: {
    link: 'https://www.example.com',
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const {link} = schemaAttribute.get(eid)
        // window.open debe llamarse de forma síncrona dentro del handler
        // del toque, si no el navegador puede bloquearlo como pop-up.
        window.open(link, '_blank')
      })
  },
})