import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useErrorHandling } from "../../../../../api/useErrorHandling";
import { useApiError } from "../../../../../api/useApiError";
import { GREY, YELLOW } from "../../../../../colors";
import { updateDetailRecord } from "../../../../../api/detailPlanRecord";

export default function UpdateRecordModal({
  handleClickModal,
  detailPlanId,
  record,
}) {
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(
    {
      403: {
        FORBIDDEN: () => alert("계획이 완료되어 수정이 불가능합니다."),
        FORBIDDEN_ADMIN: errorhandling.handleNotAdminError,
      },
    },
    errorhandling
  );

  const { mutate: modifyDetailRecord } = useMutation(
    ({ title, body }) =>
      updateDetailRecord(
        detailPlanId,
        record.record_id,
        { record_title: title, record_body: body },
        true
      ),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async () => {
        console.log("[DetailRecordList]: update detail record");
        queryClient.invalidateQueries("detailPlanRecords");
        handleClickModal({});
      },
    }
  );

  const checkUpdate = () => {
    if (title === record.record_title && body === record.record_body) {
      handleClickModal({});
    } else {
      modifyDetailRecord({ title, body });
    }
  };

  useEffect(() => {
    if (title === null) {
      setTitle(record.record_title);
    }
    if (body === null) {
      setBody(record.record_body);
    }
  }, [body, record.record_body, title, record.record_title]);

  return (
    <ModalOutside>
      <WhiteBox>
        <RecordInfoWrapper>
          인증 제목
          <TextInput
            type='text'
            defaultValue={record.record_title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </RecordInfoWrapper>
        <RecordInfoWrapper>
          인증 내용
          <TextInput
            type='text'
            defaultValue={record.record_body}
            onChange={(e) => setBody(e.target.value)}
          />
        </RecordInfoWrapper>
        <ButtonWrapper>
          <Btn color={GREY} onClick={() => handleClickModal({})}>
            취소
          </Btn>
          <Btn color={YELLOW} onClick={checkUpdate}>
            수정
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
