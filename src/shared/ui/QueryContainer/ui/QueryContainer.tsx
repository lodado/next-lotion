import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { cloneWithPropsIfAbsent } from "@/shared/utils";

export default function QueryContainer<RESPONSE, VARIABLE extends Record<string, unknown>>({
  children,
  queryKey,
  queryFn,
  variables,
  queryOptions = {} as UseQueryOptions<RESPONSE, unknown, RESPONSE, unknown[]>,
  loadingComponent = <></>,
  errorComponent = <></>,
}: {
  children: JSX.Element;
  queryKey: string;
  queryFn: (variables: VARIABLE) => Promise<RESPONSE>;
  queryOptions?: Omit<UseQueryOptions<RESPONSE, unknown, RESPONSE, any>, "queryKey" | "queryFn">;
  variables?: VARIABLE;
  loadingComponent?: JSX.Element;
  errorComponent?: JSX.Element;
}) {
  const parsedQueryKey = [queryKey, ...Object.entries(variables!).flatMap(([key, value]) => [key, value])];

  const query = useQuery({
    retry: 1,
    queryFn: () => {
      return queryFn(variables!);
    },
    ...queryOptions,
    queryKey: parsedQueryKey,
  });

  const response = query?.isError ? undefined : query?.data;

  return (
    <>
      {cloneWithPropsIfAbsent(children, { response, queryKey: parsedQueryKey })}
      {query.status === "pending" && cloneWithPropsIfAbsent(loadingComponent, { queryKey: parsedQueryKey })}
      {query.status === "error" && cloneWithPropsIfAbsent(errorComponent, { queryKey: parsedQueryKey })}
    </>
  );
}
