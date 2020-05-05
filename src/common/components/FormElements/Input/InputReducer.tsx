import { validate, ValidatorConfiguration } from "../../../util/validators";

interface State {
  value: string;
  isValid: boolean;
  isTouch: boolean;
}

type Action =
  | {
      type: "CHANGE";
      payload: {
        val: string;
        validators: ValidatorConfiguration[];
      };
    }
  | {
      type: "TOUCH";
    };

export const InputReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.payload.val,
        isValid: validate(action.payload.val, action.payload.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
};
