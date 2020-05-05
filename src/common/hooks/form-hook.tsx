import { useCallback, useReducer } from "react";
import { formReducer } from "../../places/pages/NewPlace/Form-reducer";

export const useForm: (
  initialInputs: any,
  initialFormValidity: boolean
) => any[] = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });
  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        payload: {
          inputId: id,
          isValid: isValid,
          value: value,
        },
      });
    },
    [dispatch]
  );
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      payload: {
        inputs: inputData,
        formIsValid: formValidity,
      },
    });
  }, []);
  return [formState, inputHandler, setFormData];
};
