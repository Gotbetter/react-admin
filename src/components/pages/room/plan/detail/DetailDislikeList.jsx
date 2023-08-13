import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { fetchDetailDislikes } from "../../../../../api/detailPlanRecord";
import {
  dislike_columns,
  dislike_paddings,
} from "../../../../commons/column-type/dislike";
import { useErrorHandling } from "../../../../../api/useErrorHandling";
import { useApiError } from "../../../../../api/useApiError";
import Profile from "../../../../commons/Profile";
import { PURPLE } from "../../../../../colors";

export default function DetailDislikeList({ detailPlanId }) {
  const paddings = dislike_paddings;
  const columns = dislike_columns;

  const [detailDislikeList, setDetailDislikeList] = useState([]);

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const fetchDetailDislikesQuery = useQuery(
    ["detailDislikes", detailPlanId],
    () => fetchDetailDislikes(detailPlanId),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[DetailDislikeList]: fetching detail dislike list info");
        setDetailDislikeList([...data]);
      },
      select: (res) => res.data,
    }
  );

  //   const { mutate: deleteAPlanDislike } = useMutation(
  //     ({ participantId }) => deletePlanDislike(planId, participantId),
  //     {
  //       retry: 1,
  //       onError: handleError,
  //       onSuccess: async () => {
  //         console.log("[PlanDislikeList]: delete plan dislike");
  //         queryClient.invalidateQueries("planDislikes");
  //       },
  //     }
  //   );

  return (
    <>
      {detailDislikeList.map((detailDislike) => (
        <List key={detailDislike.user_id} grid={columns.length}>
          <Profile
            profile={detailDislike.profile}
            username={detailDislike.username}
          />
          <DetailDislikeInfo padding={paddings[1]}>
            {detailDislike.created_date}
          </DetailDislikeInfo>
          <DetailDislikeInfo padding={paddings[2]}>
            <Btn
              color={PURPLE}
              //   onClick={() =>
              //     deleteAPlanDislike({
              //       participantId: detailDislike.participant_id,
              //     })
              //   }
            >
              {"삭제"}
            </Btn>
          </DetailDislikeInfo>
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

const DetailDislikeInfo = styled.div`
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
