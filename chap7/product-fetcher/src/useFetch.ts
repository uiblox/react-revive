import { useEffect, useState } from "react";
import { type Book } from "./ProductTypes";

export const useFetch = (url: string) => {
  const [data, setData] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          setError(response.statusText);
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setData(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data: data, error: error, loading: loading };
};
