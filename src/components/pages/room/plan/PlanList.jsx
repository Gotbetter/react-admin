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
  plan_dislike_columns,
  plan_dislike_paddings,
} from "../../../commons/column-type/planDislike";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DetailPlanList from "./DetailPlanList";
import { fetchPlans } from "../../../../api/plan";
import { useErrorHandling } from "../../../../api/useErrorHandling";
import { useApiError } from "../../../../api/useApiError";
import PlanInfoModal from "./PlanInfoModal";
import PlanDislikeList from "./PlanDislikeList";
import AddDetailPlanModal from "./AddDetailPlanModal";
import AddPlanDislikeModal from "./AddPlanDislikeModal";

export default function PlanList({ handleParticipantClick, participant_id }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [planList, setPlanList] = useState(null);
  const [clickInfoModal, setClickInfoModal] = useState(false);
  const [clickAddDetailModal, setClickAddDetailModal] = useState(false);
  const [clickAddDislikeModal, setClickAddDislikeModal] = useState(false);

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

  const handleClickAddDetailModal = () => {
    setClickAddDetailModal(!clickAddDetailModal);
  };

  const handleClickAddDislikeModal = () => {
    setClickAddDislikeModal(!clickAddDislikeModal);
  };

  const handleClickInfoModal = () => {
    setClickInfoModal(!clickInfoModal);
  };

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
      <ArrowWrapper>
        <IconButton
          src={ArrowLeftIcon}
          onClick={() => handleParticipantClick(0)}
        />
        {selectedOption !== null && (
          <Select value={selectedOption.plan_id} onChange={handleChangeSelect}>
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
        <IconButton src={InfoIcon} onClick={handleClickInfoModal} />
        {clickInfoModal && (
          <PlanInfoModal
            handleClickInfoModal={handleClickInfoModal}
            planInfo={planList.find(
              (plan) => plan.plan_id === selectedOption.plan_id
            )}
          />
        )}
        <AddModalButton onClick={handleClickAddDetailModal}>
          상세 계획 추가
        </AddModalButton>
      </ArrowWrapper>
      <GraphTemplate columns={detail_columns} paddings={detail_paddings}>
        {selectedOption !== null && (
          <DetailPlanList planId={selectedOption.plan_id}></DetailPlanList>
        )}
      </GraphTemplate>
      <MiddleTitle>
        전체 계획에 대해 싫어요 누른 멤버
        <AddModalButton onClick={handleClickAddDislikeModal}>
          싫어요 누를 멤버 추가
        </AddModalButton>
      </MiddleTitle>
      <GraphTemplate
        columns={plan_dislike_columns}
        paddings={plan_dislike_paddings}
      >
        {selectedOption !== null && (
          <PlanDislikeList planId={selectedOption.plan_id}></PlanDislikeList>
        )}
      </GraphTemplate>
      {clickAddDetailModal && (
        <AddDetailPlanModal
          handleClickAddModal={handleClickAddDetailModal}
          planId={selectedOption.plan_id}
        />
      )}
      {clickAddDislikeModal && (
        <AddPlanDislikeModal
          handleClickModal={handleClickAddDislikeModal}
          planId={selectedOption.plan_id}
          queryKey='plans'
        />
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
