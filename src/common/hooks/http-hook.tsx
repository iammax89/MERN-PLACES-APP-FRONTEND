import { useState, useCallback, useRef } from "react";
import { ajax } from "rxjs/ajax";
import { catchError, tap } from "rxjs/operators";
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const activeHttpRequest: React.MutableRefObject<AbortController[]> = useRef(
    []
  );
  const sendRequest$ = useCallback(
    (
      url: string,
      method?: "POST" | "GET" | "PATCH" | "DELETE",
      body?: any,
      headers?: any
    ) => {
      setIsLoading(true);
      const httpAbortCtrll = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrll);
      return ajax({
        url,
        method,
        body,
        headers,
      }).pipe(
        catchError((err) => {
          setIsLoading(false);
          setError(
            err.response.message || "Something went wrong, please try again."
          );
          console.error(err.response.message);
          throw err;
        }),
        tap(() => setIsLoading(false))
      );
    },
    []
  );
  const clearError = () => setError(null);
  return { isLoading, error, sendRequest$, clearError };
};
