import { useState } from "react";

import {
  GenerateNinjaName,
  GenerateNinjaNameApiInput,
  generateNinjaName,
} from "../api";

type Dependencies = {
  generateNinjaName: GenerateNinjaName;
};

export const makeUseGenerateNinjaName =
  ({ generateNinjaName }: Dependencies) =>
  () => {
    const [ninjaName, setNinjaName] = useState<string | undefined>();
    const [error, setError] = useState<unknown | undefined>();
    const [isGenerating, setIsGenerating] = useState(false);

    const generate = async (input: GenerateNinjaNameApiInput) => {
      setIsGenerating(true);

      try {
        const ninjaName = await generateNinjaName(input);

        setNinjaName(ninjaName);
      } catch (error) {
        setError(error);
      } finally {
        setIsGenerating(false);
      }
    };

    const reset = () => {
      setNinjaName(undefined);
      setError(undefined);
      setIsGenerating(false);
    };

    return {
      ninjaName,
      reset,
      error,
      isGenerating,
      generateNinjaName: generate,
    };
  };

export const useGenerateNinjaName = makeUseGenerateNinjaName({
  generateNinjaName,
});

export type UseGenerateNinjaName = ReturnType<typeof makeUseGenerateNinjaName>;
