interface State {
  inputs:
    | {
        name?: {
          value: string;
          isValid: boolean;
        };
        email?: {
          value: string;
          isValid: boolean;
        };
        password?: {
          value: string;
          isValid: boolean;
        };
        title?: {
          value: string;
          isValid: boolean;
        };
        describtion?: {
          value: string;
          isValid: boolean;
        };
        address?: {
          value: string;
          isValid: boolean;
        };
        image?: {
          value: File;
          isValid: boolean;
        };
      }
    | any;

  isValid: boolean;
}

type Action =
  | {
      type: "INPUT_CHANGE";
      payload: {
        inputId: string;
        isValid: boolean;
        value: string;
      };
    }
  | {
      type: "SET_DATA";
      payload: {
        inputs: any;
        formIsValid: boolean;
      };
    };

export const formReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid: boolean = true;
      Object.keys(state.inputs).map((key: string) => {
        if (!state.inputs[key]) {
          console.log(key);
        }
        if (key === action.payload.inputId) {
          return (formIsValid = formIsValid && action.payload.isValid);
        } else {
          return (formIsValid = formIsValid && state.inputs[key].isValid);
        }
      });
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.inputId]: {
            value: action.payload.value,
            isValid: action.payload.isValid,
          },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.payload.inputs,
        isValid: action.payload.formIsValid,
      };
    default:
      return state;
  }
};
