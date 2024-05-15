import { useState } from "react";

import { Card, Flex, Image, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { type CardFormValues } from "../hooks/useCardForm";
import { generateNinjaName } from "../utils/ninjaNameGenerator";
import { NinjaName } from "../components/NinjaName";
import { CardForm } from "../components/CardForm";
import { Page } from "../components/Page";

import naruto from "../assets/naruto.png";
import naruto2 from "../assets/naruto2.png";
import konoha from "../assets/konoha.png";

const Spinner = () => (
  <Flex justify="center" style={{ width: "420px" }}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
  </Flex>
);

export const NinjaNameGeneratorPage = () => {
  const [ninjaName, setNinjaName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateName = (values: CardFormValues) => {
    setIsGenerating(true);

    const ninjaName = generateNinjaName({
      cardNumber: values.cardNumber,
      cardExpirationDate: values.cardExpirationDate.toISOString(),
      cardVerificationValue: values.cardVerificationValue,
    });

    setTimeout(() => {
      setNinjaName(ninjaName);
      setIsGenerating(false);
    }, 400);
  };

  const reset = () => {
    setNinjaName("");
  };

  return (
    <Page>
      <Flex
        vertical
        style={{ width: "80%", padding: "8rem 0", margin: "0 auto" }}
      >
        <Card
          title={
            <Flex justify="center" align="center">
              <h1 style={{ marginRight: 16 }}>Monte seu nome ninja</h1>
              <Image preview={false} width={48} src={konoha} />
            </Flex>
          }
        >
          <Flex justify="space-around" align="center">
            <Image preview={false} width="25%" src={naruto} />

            <Flex vertical>
              {isGenerating ? (
                <Spinner />
              ) : ninjaName ? (
                <NinjaName ninjaName={ninjaName} onBackClick={reset} />
              ) : (
                <CardForm onSubmit={generateName} />
              )}
            </Flex>

            <Image preview={false} width="25%" src={naruto2} />
          </Flex>
        </Card>
      </Flex>
    </Page>
  );
};
