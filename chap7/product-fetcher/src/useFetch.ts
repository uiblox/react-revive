import { useEffect, useState } from "react";
import { type Book } from "./ProductTypes";

export const useFetch = (url: string) => {
  const [data, setData] = useState<Book[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [url]);

  return { data: data };
};
