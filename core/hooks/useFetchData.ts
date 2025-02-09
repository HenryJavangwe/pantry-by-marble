import { QueryObserverResult, useQuery } from "@tanstack/react-query";

interface FetchDataOptions extends RequestInit {
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
  refetchInterval?: number | false;
  refetchOnWindowFocus?: boolean;
}

type UseFetchDataResult<TData> = QueryObserverResult<TData, Error>;

const useFetchData = <TData = unknown>(
  url: string,
  options: FetchDataOptions = {}
): UseFetchDataResult<TData> => {
  const fetchData = async (): Promise<TData> => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(url, { ...options, signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (signal.aborted) {
        console.log("Fetch aborted");
        return undefined as unknown as TData;
      }
      throw error;
    }
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
