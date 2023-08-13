import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  detail_record_columns,
  detail_record_paddings,
} from "../../../../commons/column-type/detailRecord";
import { useErrorHandling } from "../../../../../api/useErrorHandling";
import { useApiError } from "../../../../../api/useApiError";
import { PURPLE, YELLOW } from "../../../../../colors";
import { fetchDetailPlanRecords } from "../../../../../api/detailPlanRecord";

export default function DetailRecordList({ planId, detailPlanId }) {
  const paddings = detail_record_paddings;
  const columns = detail_record_columns;

  const [detailPlanRecord, setDetailPlanRecord] = useState({});
  const [clickUpdateModal, setClickUpdateModal] = useState(false);
  const [detailPlanRecordList, setDetailPlanRecordList] = useState([]);

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const fetchPlansQuery = useQuery(
    ["detailPlanRecords", planId, detailPlanId],
    () => fetchDetailPlanRecords(detailPlanId, true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[DetailPlanRecordList]: fetching detailPlanRecords info");
        setDetailPlanRecordList([...data]);
      },
      select: (res) => res.data,
    }
  );

  //   const { mutate: deleteADetailPlan } = useMutation(
  //     ({ detailPlanId }) => deleteDetailPlan(planId, detailPlanId, true),
  //     {
  //       retry: 1,
  //       onError: handleError,
  //       onSuccess: async () => {
  //         console.log("[DetailPlanList]: delete detail plan");
  //         queryClient.invalidateQueries("detailPlans");
  //       },
  //     }
  //   );

  const handleClickUpdateModal = (detailPlanRecord) => {
    setDetailPlanRecord(detailPlanRecord);
    setClickUpdateModal(!clickUpdateModal);
  };

  return (
    <>
      {detailPlanRecordList.map((record) => (
        <List key={record.record_id} grid={columns.length}>
          <DetailPlanRecordInfo padding={paddings[0]}>
            {record.record_title}
          </DetailPlanRecordInfo>
          <DetailPlanRecordInfo padding={paddings[1]}>
            {record.record_body}
          </DetailPlanRecordInfo>
          <DetailPlanRecordInfo padding={paddings[2]}>
            {record.created_date}
          </DetailPlanRecordInfo>
          <DetailPlanRecordInfo padding={paddings[3]}>
            {record.updated_date}
          </DetailPlanRecordInfo>
          <DetailPlanRecordInfo padding={paddings[4]}>
            <Btn
              color={YELLOW}
              //   onClick={() => handleClickUpdateModal(detailPlan)}
            >
              {"수정"}
            </Btn>
          </DetailPlanRecordInfo>
          <DetailPlanRecordInfo padding={paddings[5]}>
            <Btn
              color={PURPLE}
              //   onClick={() =>
              //     deleteADetailPlan({ detailPlanId: detailPlan.detail_plan_id })
              //   }
            >
              {"삭제"}
            </Btn>
          </DetailPlanRecordInfo>
        </List>
      ))}
      {/* {clickUpdateModal && (
        <UpdateDetailPlanModal
          handleClickModal={handleClickUpdateModal}
          planId={planId}
          detailPlan={detailPlan}
        />
      )} */}
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

const DetailPlanRecordInfo = styled.div`
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
