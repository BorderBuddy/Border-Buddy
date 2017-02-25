import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer as router } from "react-router-redux";

const reducer = combineReducers({
  routing: router,
  form: formReducer,
});

export default reducer;
