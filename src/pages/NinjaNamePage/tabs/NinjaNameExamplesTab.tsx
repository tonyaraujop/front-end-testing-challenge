import { useEffect, useRef } from "react";

import {
  Button,
  Card,
  Checkbox,
  CheckboxProps,
  Empty,
  Flex,
  List,
  Space,
} from "antd";

import {
  type UseNinjaNames,
  useNinjaNames,
} from "../../../hooks/useNinjaNames";
import { Spinner } from "../../../components/Spinner";

type Dependencies = {
  useNinjaNames: UseNinjaNames;
};

export const makeNinjaNameExamplesTab =
  ({ useNinjaNames }: Dependencies) =>
  () => {
    const { ninjaNames, error, isFetching, refetch } = useNinjaNames();
    const refetchTimerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
      return () => {
        if (refetchTimerRef.current) clearInterval(refetchTimerRef.current);
      };
    }, []);

    const handleAutoRefreshCheckBoxChange: CheckboxProps["onChange"] = (
      event
    ) => {
      if (event.target.checked) {
        refetchTimerRef.current = setInterval(refetch, 5000);
      } else {
        clearInterval(refetchTimerRef.current);
      }
    };

    const content = (() => {
      if (isFetching) return <Spinner />;

      if (error)
        return (
          <Card style={{ width: "420px" }}>
            <Flex vertical align="center">
              <p
                style={{ textAlign: "center", fontSize: 28 }}
                data-testid="ninja-names-list-error"
              >
                Houve um erro ao carregar os exemplos.
              </p>

              <Button type="primary" onClick={refetch}>
                Recarregar
              </Button>
            </Flex>
          </Card>
        );

      if (!ninjaNames)
        return (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ width: "420px" }}
          />
        );

      const sortedNinjaNames = ninjaNames
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 4);

      return (
        <>
          <List
            bordered
            size="small"
            style={{ width: "420px" }}
            header={<h3 style={{ margin: 0 }}>Exemplos de nomes ninja</h3>}
            dataSource={sortedNinjaNames}
            renderItem={({ id, name }) => (
              <List.Item data-testid={`ninja-name-example-${id}`}>
                {name}
              </List.Item>
            )}
          />

          <Flex justify="center">
            <Button
              size="large"
              type="primary"
              style={{ margin: "0 auto" }}
              onClick={refetch}
            >
              Recarregar
            </Button>
          </Flex>
        </>
      );
    })();

    return (
      <Space direction="vertical" size="large">
        <Checkbox
          aria-label="Auto-recarregar"
          onChange={handleAutoRefreshCheckBoxChange}
        >
          Auto-recarregar
        </Checkbox>

        {content}
      </Space>
    );
  };

export const NinjaNameExamplesTab = makeNinjaNameExamplesTab({
  useNinjaNames,
});
