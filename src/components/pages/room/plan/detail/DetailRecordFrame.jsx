import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ArrowLeftIcon from "../../../../../assets/arrow-left.svg";
import InfoIcon from "../../../../../assets/info.svg";
import DetailInfoModal from "./DetailInfoModal";
import AddRecordModal from "./AddRecordModal";
import GraphTemplate from "../../../../commons/GraphTemplate";
import {
  detail_record_columns,
  detail_record_paddings,
} from "../../../../commons/column-type/detailRecord";
import DetailRecordList from "./DetailRecordList";
import {
  dislike_columns,
  dislike_paddings,
} from "../../../../commons/column-type/dislike";
import DetailDislikeList from "./DetailDislikeList";
import AddDetailDislikeModal from "./AddDetailDislikeModal";
import { useErrorHandling } from "../../../../../api/useErrorHandling";
import { useApiError } from "../../../../../api/useApiError";
import {
  fetchDetailPlan,
  completeDetailPlan,
  unCompleteDetailPlan,
} from "../../../../../api/detailPlan";

export default function DetailRecordFrame({
  planId,
  detailPlanId,
  handleClickDetailPlan,
}) {
  const [detailPlan, setDetailPlan] = useState(null);
  const [detailInfoModal, setDetailInfoModal] = useState(false);
  const [addRecordModal, setAddRecordModal] = useState(false);
  const [addDetailDislikeModal, setAddDetailDislikeModal] = useState(false);

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(
    {
      403: {
        FORBIDDEN: () => alert("계획 인증이 필요합니다."),
        FORBIDDEN_ADMIN: errorhandling.handleNotAdminError,
      },
    },
    errorhandling
  );

  const fetchDetailPlanQuery = useQuery(
    ["detailPlan"],
    () => fetchDetailPlan(planId, detailPlanId),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[DetailPlan]: fetching one detail plan info");
        setDetailPlan(data);
      },
      select: (res) => res.data,
    }
  );

  const { mutate: completeDetail } = useMutation(
    ({ detail_plan_id }) => completeDetailPlan(planId, detail_plan_id),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[CompleteDetailPlan]: complete detail plan");
        queryClient.invalidateQueries("detailPlan");
      },
    }
  );

  const { mutate: unCompleteDetail } = useMutation(
    ({ detail_plan_id }) => unCompleteDetailPlan(planId, detail_plan_id),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[UnCompleteDetailPlan]: uncomplete detail plan");
        queryClient.invalidateQueries("detailPlan");
      },
    }
  );

  const handleDetailInfoModal = () => {
    setDetailInfoModal(!detailInfoModal);
  };

  const handleAddRecordModal = () => {
    setAddRecordModal(!addRecordModal);
  };

  const handleAddRecordDislikeModal = () => {
    setAddDetailDislikeModal(!addDetailDislikeModal);
  };

  const handleBtnClick = (detailPlan) => {
    if (!detailPlan.complete) {
      completeDetail({ detail_plan_id: detailPlan.detail_plan_id });
    } else {
      unCompleteDetail({ detail_plan_id: detailPlan.detail_plan_id });
    }
  };

  return (
    <>
      {detailPlan !== null && (
        <>
          <ArrowWrapper>
            <IconButton
              src={ArrowLeftIcon}
              onClick={() => handleClickDetailPlan({})}
            />
            <ContentText>{detailPlan.content}</ContentText>{" "}
            <IconButton src={InfoIcon} onClick={handleDetailInfoModal} />
            {detailInfoModal && (
              <DetailInfoModal
                handleClickInfoModal={handleDetailInfoModal}
                detailPlanInfo={detailPlan}
              />
            )}
            <AddModalButton onClick={handleAddRecordModal}>
              세부 계획 인증 추가
            </AddModalButton>
            <BtnComplete
              color={!detailPlan.complete ? "true" : undefined}
              onClick={() => handleBtnClick(detailPlan)}
            >
              {!detailPlan.complete ? "계획 완료" : "완료 취소"}
            </BtnComplete>
          </ArrowWrapper>
          <GraphTemplate
            columns={detail_record_columns}
            paddings={detail_record_paddings}
          >
            {detailPlan !== null && (
              <DetailRecordList
                planId={planId}
                detailPlanId={detailPlan.detail_plan_id}
              />
            )}
          </GraphTemplate>
          <MiddleTitle>
            세부 계획에 대해 싫어요 누른 멤버
            <AddModalButton onClick={handleAddRecordDislikeModal}>
              싫어요 누를 멤버 추가
            </AddModalButton>
          </MiddleTitle>
          <GraphTemplate columns={dislike_columns} paddings={dislike_paddings}>
            {detailPlan !== null && (
              <DetailDislikeList detailPlanId={detailPlan.detail_plan_id} />
            )}
          </GraphTemplate>
          {addRecordModal && (
            <AddRecordModal
              handleClickAddModal={handleAddRecordModal}
              detailPlanId={detailPlan.detail_plan_id}
            />
          )}
          {addDetailDislikeModal && (
            <AddDetailDislikeModal
              handleClickModal={handleAddRecordDislikeModal}
              detailPlanId={detailPlan.detail_plan_id}
            />
          )}
        </>
      )}
    </>
  );
}

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 35px;
  font-size: 17px;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  color: #9fa2b4;
`;

const ContentText = styled.div`
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 17px;
  font-weight: bold;
  color: #252733;
`;

const IconButton = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const MiddleTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 35px;
  margin-bottom: 5px;

  font-size: 16px;
  font-style: normal;
  font-weight: bold;
  line-height: 22px; /* 137.5% */
  letter-spacing: 0.3px;
  color: #252733;
`;

const AddModalButton = styled.div`
  align-items: center;
  margin-left: 10px;
  font-size: 17px;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  color: #9fa2b4;
  cursor: pointer;
  transition: color 0.3s; /* 변화를 부드럽게 만들기 위한 트랜지션 설정 */

  &:hover {
    /* font-weight: bold; */
    color: #3751ff; /* 마우스를 올렸을 때의 배경 색상 */
  }
`;

const BtnComplete = styled.button`
  /* width: 65px; */
  height: 24px;
  background-color: ${(props) => (props.color ? "#fafbd4" : "#f0f0f0")};
  color: #252733;
  text-align: center;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2px;
  border-width: 1px;
  border-radius: 3px;
  /* border: none; */
  cursor: pointer;
  /* margin: 20px; */
  margin-left: 10px;
`;
