import { type PropsWithChildren } from "react";

import { Layout } from "antd";

export const Page = ({ children }: PropsWithChildren) => (
  <Layout style={{ width: "100%", height: "100%", background: "transparent" }}>
    {children}
  </Layout>
);
