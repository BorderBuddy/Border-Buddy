import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer as router } from "react-router-redux";
import traveler from './traveler'

const reducer = combineReducers({
  routing: router,
  form: formReducer,
  traveler
});

export default reducer;
