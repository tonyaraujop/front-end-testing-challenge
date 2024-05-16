import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const Spinner = () => (
  <Flex justify="center" style={{ width: "420px", padding: "2rem" }}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
  </Flex>
);
