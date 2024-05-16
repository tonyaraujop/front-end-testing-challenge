import { useState } from "react";

import { Card, Flex, Image, Radio, Space } from "antd";

import { NinjaNameExamplesTab } from "./tabs/NinjaNameExamplesTab";
import { NinjaNameGeneratorTab } from "./tabs/NinjaNameGeneratorTab";
import { Page } from "../../components/Page";

import naruto from "../../assets/naruto.png";
import naruto2 from "../../assets/naruto2.png";
import konoha from "../../assets/konoha.png";

const tabOptions = [
  { label: "Gerador de nomes", value: "ninjaNameGenerator" },
  { label: "Exemplos de nomes", value: "ninjaNameExamples" },
];

export const NinjaNamePage = () => {
  const [currentTab, setCurrentTab] = useState(tabOptions[0].value);

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
          <Flex justify="space-around" style={{ alignItems: "stretch" }}>
            <Image
              preview={false}
              width="25%"
              wrapperStyle={{ alignSelf: "center" }}
              src={naruto}
            />

            <Space size="large" direction="vertical" align="center">
              <Radio.Group
                size="large"
                options={tabOptions}
                onChange={(option) => setCurrentTab(option.target.value)}
                value={currentTab}
                optionType="button"
              />

              {currentTab === "ninjaNameGenerator" ? (
                <NinjaNameGeneratorTab />
              ) : (
                <NinjaNameExamplesTab />
              )}
            </Space>

            <Image
              preview={false}
              width="25%"
              wrapperStyle={{ alignSelf: "center" }}
              src={naruto2}
            />
          </Flex>
        </Card>
      </Flex>
    </Page>
  );
};
