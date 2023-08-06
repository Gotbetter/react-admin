import React from "react";
import { styled } from "styled-components";
import MenuBar from "./MenuBar";
import MenuContent from "./MenuContent";

export default function ContentArea({ tab, title, children }) {
  return (
    <Layout>
      <MenuBar tab={tab} />
      <MenuContent title={title}>{children}</MenuContent>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: row;
`;
