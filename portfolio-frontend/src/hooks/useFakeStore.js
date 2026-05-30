import { useState, useEffect } from "react";

const useFakeStore = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null); // 'network' | 'client' | 'server'

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setErrorType(null);

    fetchFn()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setErrorType(err.name); // NetworkError | ClientError | ServerError
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, deps); // eslint-disable-line

  return { data, loading, error, errorType };
};

export default useFakeStore;
