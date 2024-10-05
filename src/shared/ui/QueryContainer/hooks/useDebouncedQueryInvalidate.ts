import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "lodash-es";

const useDebouncedQueryInvalidate = ({ queryKey }: { queryKey: string }) => {
  const queryClient = useQueryClient();

  const debouncedQueryInvalidate = useDebounce(
    () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    500,
    [queryClient, queryKey]
  );

  return { debouncedQueryInvalidate };
};

export default useDebouncedQueryInvalidate;
