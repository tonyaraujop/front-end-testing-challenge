import { Button, Card, Flex } from "antd";

import {
  type UseGenerateNinjaName,
  useGenerateNinjaName,
} from "../../../hooks/useGenerateNinjaName";
import { NinjaName } from "../../../components/NinjaName";
import { CardForm } from "../../../components/CardForm";
import { Spinner } from "../../../components/Spinner";

type Dependencies = {
  useGenerateNinjaName: UseGenerateNinjaName;
};

export const makeNinjaNameGeneratorTab =
  ({ useGenerateNinjaName }: Dependencies) =>
  () => {
    const { generateNinjaName, ninjaName, isGenerating, error, reset } =
      useGenerateNinjaName();

    if (isGenerating) return <Spinner />;

    if (error)
      return (
        <Card style={{ width: "420px" }}>
          <Flex vertical align="center">
            <p
              style={{ textAlign: "center", fontSize: 28 }}
              data-testid="ninja-name-generation-error"
            >
              Houve um erro ao gerar seu nome de ninja.
            </p>

            <Button type="primary" onClick={reset}>
              Voltar
            </Button>
          </Flex>
        </Card>
      );

    if (ninjaName)
      return <NinjaName ninjaName={ninjaName} onBackClick={reset} />;

    return (
      <CardForm
        onSubmit={(values) =>
          generateNinjaName({
            cardNumber: values.cardNumber,
            cardExpirationDate: values.cardExpirationDate.toISOString(),
            cardVerificationValue: values.cardVerificationValue,
          })
        }
      />
    );
  };

export const NinjaNameGeneratorTab = makeNinjaNameGeneratorTab({
  useGenerateNinjaName,
});
