// src/hooks/useApi.js
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/slices/uiSlice";

export const useApi = (apiHook, options = {}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [trigger, { isLoading, isSuccess, isError }] = apiHook();

  const execute = async (...args) => {
    dispatch(setLoading({ key: options.loadingKey, value: true }));
    try {
      const result = await trigger(...args).unwrap();
      setData(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      dispatch(setLoading({ key: options.loadingKey, value: false }));
    }
  };

  return { execute, data, error, isLoading, isSuccess, isError };
};
