
import {COUNTRIES_ERROR, COUNTRIES_SUCCESS} from "./actions";

let initialState = {
  countries: [],
  isLoading: true,
  isLoadError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {

    case COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
        isLoading: false,
      };

    case COUNTRIES_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoadError: true,
      };

    default:
      return state;
  }
}
