import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useErrorHandling } from "../../../../api/useErrorHandling";
import { useApiError } from "../../../../api/useApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDetailPlan } from "../../../../api/detailPlan";
import { GREY, YELLOW } from "../../../../colors";

export default function UpdateDetailPlanModal({
  handleClickModal,
  planId,
  detailPlan,
}) {
  const [content, setContent] = useState(null);

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const { mutate: modifyDetailPlan } = useMutation(
    ({ content }) =>
      updateDetailPlan(planId, detailPlan.detail_plan_id, { content }, true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async () => {
        console.log("[DetailPlanList]: update detail plan");
        queryClient.invalidateQueries("detailPlans");
        handleClickModal({});
      },
    }
  );

  const checkUpdate = () => {
    if (content === detailPlan.content) {
      handleClickModal({});
    } else {
      modifyDetailPlan({ content });
    }
  };

  useEffect(() => {
    if (content === null) {
      setContent(detailPlan.content);
    }
  }, [content, detailPlan]);

  return (
    <ModalOutside>
      <WhiteBox>
        <DetailPlanInfoWrapper>
          내용
          <TextInput
            type='text'
            defaultValue={detailPlan.content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DetailPlanInfoWrapper>
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

const DetailPlanInfoWrapper = styled.div`
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
