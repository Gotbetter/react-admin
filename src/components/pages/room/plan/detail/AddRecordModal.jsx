import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useErrorHandling } from "../../../../../api/useErrorHandling";
import { useApiError } from "../../../../../api/useApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GREY, BLUE } from "../../../../../colors";
import { createDetailRecord } from "../../../../../api/detailPlanRecord";

export default function AddRecordModal({ handleClickAddModal, detailPlanId }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(
    {
      403: {
        FORBIDDEN: () => alert("계획이 완료되어 추가 인증이 불가능합니다."),
        FORBIDDEN_ADMIN: errorhandling.handleNotAdminError,
      },
    },
    errorhandling
  );

  const { mutate: newRecord } = useMutation(
    ({ title, body }) =>
      createDetailRecord(detailPlanId, {
        record_title: title,
        record_body: body,
      }),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async () => {
        console.log("[DetailRecordList]: create detail record");
        queryClient.invalidateQueries("detailPlanRecords");
        handleClickAddModal();
      },
    }
  );

  return (
    <ModalOutside>
      <WhiteBox>
        <RecordInfoWrapper>
          인증 제목
          <TextInput
            type='text'
            placeholder={"인증 제목을 작성해주세요."}
            onChange={(e) => setTitle(e.target.value)}
          />
        </RecordInfoWrapper>
        <RecordInfoWrapper>
          인증 내용
          <TextInput
            type='text'
            placeholder={"인증 내용을 작성해주세요."}
            onChange={(e) => setBody(e.target.value)}
          />
        </RecordInfoWrapper>
        <ButtonWrapper>
          <Btn color={GREY} onClick={handleClickAddModal}>
            취소
          </Btn>
          <Btn color={BLUE} onClick={() => newRecord({ title, body })}>
            추가
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

const RecordInfoWrapper = styled.div`
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
