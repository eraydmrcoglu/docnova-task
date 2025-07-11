import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import './App.css'
import './i18n'
import { setUser } from './features/auth/authSlice'

// Eğer kullanıcı zaten login olduysa Redux’a geri yükle
const savedUser = localStorage.getItem('user')
if (savedUser) {
  store.dispatch(setUser(JSON.parse(savedUser)))
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)