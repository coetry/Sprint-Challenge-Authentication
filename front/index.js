const html = require('choo/html')
const choo = require('choo')

const app = choo()

app.use(require('choo-devtools')())

app.use((state, emitter) => {
  
  state.loggedIn = false
  state.jwt = ''

  emitter.on('DOMContentLoaded', () => {
    emitter.on('login', () => {
      state.loggedIn = true
      emitter.emit(state.events.PUSHSTATE, '/')
    })

    emitter.on('logout', () => {
      state.loggedIn = false
      emitter.emit('render')
    })
  })
})

app.route('/', (state, emit) => {
  return html`
    <body>
    ${state.loggedIn 
      ? html`
        <div>
          hello!
          <button onclick=${logout}>logout</button>
        </div>`
      : html`<a href="/login">login</a>`
    }
    </body>
  `
  function logout (e) {
    emit('logout')
  }
})

app.route('/login', (state, emit) => {
    return html`
      <body>
        <form onsubmit=${submit}>
          <label for="username">
            username:
            <input id="username" name="username" type="text" />
          </label>
          <label for="password">
            password:
            <input id="password" name="password" type="password" />
          </label>
          <button type="submit">login</button>
        </form>
      </body>
    `
  function submit(e) {
    e.preventDefault()
    console.log(e.target.elements.password)
    emit('login')
  }
})

app.mount('body')
