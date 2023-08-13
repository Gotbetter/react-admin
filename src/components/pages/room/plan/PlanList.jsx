import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ArrowLeftIcon from "../../../../assets/arrow-left.svg";
import InfoIcon from "../../../../assets/info.svg";
import GraphTemplate from "../../../commons/GraphTemplate";
import {
  detail_columns,
  detail_paddings,
} from "../../../commons/column-type/detail";
import {
  dislike_columns,
  dislike_paddings,
} from "../../../commons/column-type/dislike";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DetailPlanList from "./DetailPlanList";
import { fetchPlans } from "../../../../api/plan";
import { useErrorHandling } from "../../../../api/useErrorHandling";
import { useApiError } from "../../../../api/useApiError";
import PlanInfoModal from "./PlanInfoModal";
import PlanDislikeList from "./PlanDislikeList";
import AddDetailPlanModal from "./AddDetailPlanModal";
import AddPlanDislikeModal from "./AddPlanDislikeModal";
import {
  detail_record_columns,
  detail_record_paddings,
} from "../../../commons/column-type/detailRecord";
import DetailRecordList from "./detail/DetailRecordList";
import AddRecordModal from "./detail/AddRecordModal";
import AddDetailDislikeModal from "./detail/AddDetailDislikeModal";
import DetailDislikeList from "./detail/DetailDislikeList";
import DetailInfoModal from "./detail/DetailInfoModal";

export default function PlanList({ handleParticipantClick, participant_id }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [planList, setPlanList] = useState(null);

  // modal
  const [planInfoModal, setPlanInfoModal] = useState(false);
  const [detailInfoModal, setDetailInfoModal] = useState(false);
  const [addDetailModal, setAddDetailModal] = useState(false);
  const [addPlanDislikeModal, setAddPlanDislikeModal] = useState(false);
  const [addRecordModal, setAddRecordModal] = useState(false);
  const [addDetailDislikeModal, setAddDetailDislikeModal] = useState(false);

  // click detail plan
  const [detailPlan, setDetailPlan] = useState(null);
  const [clickDetailPlan, setClickDetailPlan] = useState(false);

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const fetchPlansQuery = useQuery(
    ["plans"],
    () => fetchPlans(participant_id),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[PlanList]: fetching plans info");
        setPlanList([...data]);
      },
      select: (res) => res.data,
    }
  );

  // handle modal
  const handlePlanInfoModal = () => {
    setPlanInfoModal(!planInfoModal);
  };

  const handleDetailInfoModal = () => {
    setDetailInfoModal(!detailInfoModal);
  };

  const handleAddDetailModal = () => {
    setAddDetailModal(!addDetailModal);
  };

  const handleAddPlanDislikeModal = () => {
    setAddPlanDislikeModal(!addPlanDislikeModal);
  };

  const handleAddRecordModal = () => {
    setAddRecordModal(!addRecordModal);
  };

  const handleAddRecordDislikeModal = () => {
    setAddDetailDislikeModal(!addDetailDislikeModal);
  };

  // handle click detail plan
  const handleClickDetailPlan = (detailPlan) => {
    setDetailPlan(detailPlan);
    setClickDetailPlan(!clickDetailPlan);
  };

  // select change
  const handleChangeSelect = (e) => {
    const plan_id = parseInt(e.target.value);
    setSelectedOption(planList.find((plan) => plan.plan_id === plan_id));
  };

  useEffect(() => {
    if (planList !== null) {
      if (selectedOption === null) {
        setSelectedOption(planList[0]);
      }
    }
  }, [planList, selectedOption]);

  return (
    <>
      {!clickDetailPlan ? (
        <>
          <ArrowWrapper>
            <IconButton
              src={ArrowLeftIcon}
              onClick={() => handleParticipantClick(0)}
            />
            {selectedOption !== null && (
              <Select
                value={selectedOption.plan_id}
                onChange={handleChangeSelect}
              >
                {planList.map((plan) => (
                  <option key={plan.plan_id} value={plan.plan_id}>
                    {plan.week +
                      "주차 " +
                      "(" +
                      plan.start_date +
                      " ~ " +
                      plan.target_date +
                      ")"}
                  </option>
                ))}
              </Select>
            )}
            <IconButton src={InfoIcon} onClick={handlePlanInfoModal} />
            {planInfoModal && (
              <PlanInfoModal
                handleClickInfoModal={handlePlanInfoModal}
                planInfo={planList.find(
                  (plan) => plan.plan_id === selectedOption.plan_id
                )}
              />
            )}
            <AddModalButton onClick={handleAddDetailModal}>
              세부 계획 추가
            </AddModalButton>
          </ArrowWrapper>
          <GraphTemplate columns={detail_columns} paddings={detail_paddings}>
            {selectedOption !== null && (
              <DetailPlanList
                planId={selectedOption.plan_id}
                handleClickDetailPlan={handleClickDetailPlan}
              ></DetailPlanList>
            )}
          </GraphTemplate>
          <MiddleTitle>
            전체 계획에 대해 싫어요 누른 멤버
            <AddModalButton onClick={handleAddPlanDislikeModal}>
              싫어요 누를 멤버 추가
            </AddModalButton>
          </MiddleTitle>
          <GraphTemplate columns={dislike_columns} paddings={dislike_paddings}>
            {selectedOption !== null && (
              <PlanDislikeList
                planId={selectedOption.plan_id}
              ></PlanDislikeList>
            )}
          </GraphTemplate>
          {addDetailModal && (
            <AddDetailPlanModal
              handleClickAddModal={handleAddDetailModal}
              planId={selectedOption.plan_id}
            />
          )}
          {addPlanDislikeModal && (
            <AddPlanDislikeModal
              handleClickModal={handleAddPlanDislikeModal}
              planId={selectedOption.plan_id}
              queryKey='plans'
            />
          )}
        </>
      ) : (
        <>
          <ArrowWrapper>
            <IconButton
              src={ArrowLeftIcon}
              onClick={() => handleClickDetailPlan({})}
            />
            <ContentText>{detailPlan.content}</ContentText>
            {/**세부 계획 완료 버튼 만들기 */}
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
          </ArrowWrapper>
          <GraphTemplate
            columns={detail_record_columns}
            paddings={detail_record_paddings}
          >
            {detailPlan !== null && (
              <DetailRecordList
                planId={selectedOption.plan_id}
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

const Select = styled.select`
  width: 250px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 3px;
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  border: 1px solid #dfe0eb;
  border-radius: 5px;
  color: #333;
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
