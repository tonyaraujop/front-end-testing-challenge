import { useEffect, useState } from "react";

import { FetchNinjaNames, fetchNinjaNames } from "../api";

type Dependencies = {
  fetchNinjaNames: FetchNinjaNames;
};

type NinjaNameItem = { id: string; name: string };

export const makeUseNinjaNames =
  ({ fetchNinjaNames }: Dependencies) =>
  () => {
    const [ninjaNames, setNinjaNames] = useState<NinjaNameItem[] | undefined>();
    const [error, setError] = useState<unknown | undefined>();
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
      fetchNames();
    }, []);

    const fetchNames = async () => {
      setIsFetching(true);

      try {
        const ninjaNames = await fetchNinjaNames();

        setNinjaNames(ninjaNames);
      } catch (error) {
        setError(error);
      } finally {
        setIsFetching(false);
      }
    };

    const refetch = () => {
      setNinjaNames(undefined);
      setError(undefined);
      fetchNames();
    };

    return {
      ninjaNames,
      isFetching,
      refetch,
      error,
    };
  };

export const useNinjaNames = makeUseNinjaNames({
  fetchNinjaNames,
});

export type UseNinjaNames = ReturnType<typeof makeUseNinjaNames>;
