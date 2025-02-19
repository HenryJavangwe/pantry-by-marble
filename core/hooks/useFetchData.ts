import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { mock_products } from "../mocks/products";

interface FetchDataOptions extends RequestInit {
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
  refetchInterval?: number | false;
  refetchOnWindowFocus?: boolean;
}

type UseFetchDataResult<TData> = QueryObserverResult<TData, Error>;

// adjust the returned data to inject mock data - mock_products
const useFetchData = <TData = unknown>(
  url: string,
  options: FetchDataOptions = {}
): UseFetchDataResult<TData> => {
  const fetchData = async (): Promise<TData> => {
    // const controller = new AbortController();
    // const signal = controller.signal;

    // try {
    //   const response = await fetch(url, { ...options, signal });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   return await response.json();
    // } catch (error) {
    //   if (signal.aborted) {
    //     console.log("Fetch aborted");
    //     return undefined as unknown as TData;
    //   }
    //   throw error;
    // }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock_products as TData);
      }, 200);
    });
  };

  const queryResult = useQuery<TData, Error>({
    queryKey: [url, options],
    queryFn: fetchData,
    retry: false,
    ...options,
  });

  return queryResult;
};

export { useFetchData };
