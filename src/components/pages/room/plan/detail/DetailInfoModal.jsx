import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { GREY } from "../../../../../colors";

export default function DetailInfoModal({
  handleClickInfoModal,
  detailPlanInfo,
}) {
  return (
    <ModalOutside>
      <WhiteBox>
        <DetailInfoWrapper>
          내용
          <TextInput
            type='text'
            defaultValue={detailPlanInfo.content}
            readOnly={true}
          />
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          세부 계획 완료 여부
          <TextInput
            type='text'
            defaultValue={detailPlanInfo.completed ? "완료" : "미완료"}
            readOnly={true}
          />
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          평가 가능 여부
          <TextInput
            type='text'
            defaultValue={detailPlanInfo.rejected ? "불가능" : "가능"}
            readOnly={true}
          />
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          작성 날짜
          <TextInput
            type='text'
            defaultValue={detailPlanInfo.created_date}
            readOnly={true}
          />
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          수정 날짜
          <TextInput
            type='text'
            defaultValue={detailPlanInfo.updated_date}
            readOnly={true}
          />
        </DetailInfoWrapper>
        <ButtonWrapper>
          <Btn color={GREY} onClick={handleClickInfoModal}>
            닫기
          </Btn>
          {/* <Btn color={GREY} onClick={() => handleClickModal({})}>
            수정
          </Btn> */}
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
  width: 400px;
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

const DetailInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
  margin-top: 15px;
  margin-left: 5px;
  color: #252733;
`;

const TextInput = styled.input`
  width: 220px;
  height: 30px;
  padding: 10px;
  fill: #fff;
  border-radius: 8px;
  color: #535151;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);

  /* 읽기 전용일 때 스타일 변경 */
  ${(props) =>
    props.readOnly &&
    `
    background-color: #ccc; /* 읽기 전용 배경색 */
    border-color: #ccc; /* 읽기 전용 테두리 색 */
    cursor: not-allowed;
  `}
`;
