import React from "react";
import styled from "styled-components";
import { GREY, PURPLE, YELLOW } from "../../colors";

export default function DeleteModal({
  handleClickModal,
  deleteFunc,
  deleteInfo,
}) {
  const handleDelete = () => {
    deleteFunc(deleteInfo);
    handleClickModal({});
  };

  return (
    <ModalOutside>
      <WhiteBox>
        <TextWrapper>정말 삭제하시겠습니까?</TextWrapper>
        <ButtonWrapper>
          <Btn color={GREY} onClick={() => handleClickModal({})}>
            취소
          </Btn>
          <Btn color={PURPLE} onClick={handleDelete}>
            삭제
          </Btn>
        </ButtonWrapper>
      </WhiteBox>
    </ModalOutside>
  );
}

const ModalOutside = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const WhiteBox = styled.div`
  position: relative;
  width: 350px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px;
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const Btn = styled.button`
  width: 54px;
  height: 24px;
  background-color: ${(props) => (props.color ? `${props.color}` : "black")};
  color: white;
  text-align: center;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 1px;
`;

const TextWrapper = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  letter-spacing: 0.2px;
`;
