import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducer'

const composedEnhancer = composeWithDevTools(
  applyMiddleware()
)

export const store = createStore(rootReducer, composedEnhancer)

