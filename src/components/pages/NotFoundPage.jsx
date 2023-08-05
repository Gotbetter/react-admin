import React from "react";
import styled from "styled-components";

export default function NotFoundPage() {
  return <NotFoundImg>Not Found Page</NotFoundImg>;
}

const NotFoundImg = styled.div`
  padding-top: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  color: #d9d9d9;
`;
