import { useEffect, useState } from "react";
import { type Book } from "./ProductTypes";

export const useFetch = (url: string) => {
  const [data, setData] = useState<Book[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);

  return { data: data };
};
