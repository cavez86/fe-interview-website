import { useEffect, useState } from "react";

export const useFetch = <T>(
  fetchFn: ({ signal }: { signal: AbortSignal }) => Promise<T>,
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);

    fetchFn({ signal: abortController.signal })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [fetchFn]);

  return { data, loading, error };
};
