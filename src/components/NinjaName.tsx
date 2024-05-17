import { type FC } from "react";

import { Button, Card, Flex } from "antd";

export type NinjaNameProps = {
  ninjaName: string;
  onBackClick: () => void;
};

export const NinjaName: FC<NinjaNameProps> = ({ onBackClick, ninjaName }) => {
  return (
    <Card style={{ width: "420px" }}>
      <Flex vertical align="center">
        <p style={{ textAlign: "center", fontSize: 28 }}>
          <strong>Seu nome é:</strong>
          <br />
          <span data-testid="ninja-name">{ninjaName}</span>
        </p>

        <Button type="primary" onClick={() => onBackClick()}>
          Voltar
        </Button>
      </Flex>
    </Card>
  );
};
