import { useRef, useState, useEffect } from "react";

export default (initValue) => {
  const ref = useRef(0);
  const callFRef = useRef();
  const setFuncRef = useRef();
  let [state, setState] = useState(initValue);
  if (!ref.current) {
    ref.current = 1;
    setFuncRef.current = (newData, callF) => {
      callFRef.current = callF;
      setState(newData);
      return Promise.resolve(newData);
    };
  }
  useEffect(() => {
    callFRef.current?.(state);
  }, [state]);
  return [state, setFuncRef.current];
};
