import React from "react";
import { styled } from "styled-components";
import MenuBar from "./MenuBar";
import MenuContent from "./MenuContent";

export default function Layout({ tab, title, Middle, children }) {
  return (
    <Wrapper>
      <MenuBar tab={tab} />
      <MenuContent title={title} Middle={Middle}>
        {children}
      </MenuContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
