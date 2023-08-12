import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useErrorHandling } from "../../../../api/useErrorHandling";
import { useApiError } from "../../../../api/useApiError";
import { fetchDetailPlans } from "../../../../api/detailPlan";
import {
  detail_columns,
  detail_paddings,
} from "../../../commons/column-type/detail";
import { PURPLE, YELLOW } from "../../../../colors";
import ArrowIcon from "../../../../assets/arrowIcon.svg";

export default function DetailPlanList({ planId }) {
  const paddings = detail_paddings;
  const columns = detail_columns;

  const [detailPlanList, setDetailPlanList] = useState([]);

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const fetchPlansQuery = useQuery(
    ["detailPlans", planId],
    () => fetchDetailPlans(planId, true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[DetailPlanList]: fetching detailPlans info");
        setDetailPlanList([...data]);
      },
      select: (res) => res.data,
    }
  );
  //onClick={() => handleClickModal(user)} onClick={() => deleteAUser({ userId: user.user_id })}
  return (
    <>
      {detailPlanList.map((detailPlan) => (
        <List key={detailPlan.detail_plan_id} grid={columns.length}>
          <DetailPlanInfo padding={paddings[0]}>
            {detailPlan.content}
          </DetailPlanInfo>
          <DetailPlanInfo padding={paddings[1]}>
            {detailPlan.complete ? "완료" : "미완료"}
          </DetailPlanInfo>
          <DetailPlanInfo padding={paddings[2]}>
            {detailPlan.rejected ? "불가능" : "가능"}
          </DetailPlanInfo>
          <DetailPlanInfo padding={paddings[3]}>
            {detailPlan.created_date}
          </DetailPlanInfo>
          <DetailPlanInfo padding={paddings[4]}>
            {detailPlan.updated_date}
          </DetailPlanInfo>
          <DetailPlanInfo padding={paddings[5]}>
            <Btn color={YELLOW}>{"수정"}</Btn>
          </DetailPlanInfo>
          <DetailPlanInfo padding={paddings[6]}>
            <Btn color={PURPLE}>{"삭제"}</Btn>
            <ArrowButton src={ArrowIcon} />
          </DetailPlanInfo>
        </List>
      ))}
    </>
  );
}

const List = styled.li`
  align-items: center;
  padding: 24px 31px 24px 31px; // top right bottom left: ;
  border-bottom: 1px solid #dfe0eb;
  display: grid;
  grid-template-columns: ${(props) =>
    props.grid
      ? `repeat(auto-fit, minmax(${props.grid}%, 1fr));`
      : "repeat(auto-fit, minmax(25%, 1fr));"}; /* 자동으로 요소들 배치 */
`;

const DetailPlanInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: ${(props) => (props.padding ? `${props.padding}px` : "0px")};
  color: #252733;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.2px;
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
  border-radius: 13px;
  border: none;
  cursor: ${(props) => (props.cursor ? "default" : "pointer")};
`;

const ArrowButton = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 20px;
  cursor: pointer;
`;
