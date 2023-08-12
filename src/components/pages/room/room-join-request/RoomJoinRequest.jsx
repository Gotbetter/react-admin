import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import GraphTemplate from "../../../commons/GraphTemplate";
import {
  join_request_columns,
  join_request_paddings,
} from "../../../commons/column-type/participant";
import Profile from "../../../commons/Profile";
import { GREEN, PURPLE } from "../../../../colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandling } from "../../../../api/useErrorHandling";
import { useApiError } from "../../../../api/useApiError";
import {
  approveJoinRequest,
  rejectJoinRequest,
} from "../../../../api/participant";
import { createPlans } from "../../../../api/plan";

export default function RoomJoinRequest({ joinRequesters, roomId }) {
  const paddings = join_request_paddings;
  const columns = join_request_columns;

  const [participantInfo, setParticipantInfo] = useState(null);

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(
    {
      409: {
        CONFLICT_MAX: () => alert("이미 최대 인원입니다."),
        CONFLICT: () => alert("이미 생성된 계획입니다."),
      },
      403: {
        FORBIDDEN_DATE: () => alert("이미 종료된 방입니다."),
        FORBIDDEN_ADMIN: errorhandling.handleNotAdminError,
      },
    },
    errorhandling
  );

  const { mutate: approve } = useMutation(
    ({ user_id }) =>
      approveJoinRequest(
        {
          user_id: user_id,
          room_id: roomId,
        },
        true
      ),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (res) => {
        console.log("[RoomJoinRequesters]: approve join request");
        setParticipantInfo(res.data);
      },
    }
  );

  const { mutate: addPlans } = useMutation(
    ({ participant_id }) =>
      createPlans({ participant_id: participant_id }, true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async () => {
        console.log("[RoomJoinRequesters]: create plans");
        queryClient.invalidateQueries("joinRequesters");
      },
    }
  );

  const { mutate: reject } = useMutation(
    ({ user_id }) =>
      rejectJoinRequest(
        {
          user_id,
          room_id: roomId,
        },
        true
      ),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async () => {
        console.log("[RoomJoinRequesters]: reject join request");
        queryClient.invalidateQueries("joinRequesters");
      },
    }
  );

  const handleApproveClick = (userId) => {
    approve({ user_id: userId });
  };

  useEffect(() => {
    if (participantInfo !== null) {
      // plan 생성
      addPlans({ participant_id: participantInfo.participant_id });
      setParticipantInfo(null);
    }
  }, [addPlans, participantInfo]);

  return (
    <GraphTemplate columns={columns} paddings={paddings}>
      {joinRequesters.map((joinRequester) => (
        <List key={joinRequester.user_id} grid={columns.length}>
          <Profile
            profile={joinRequester.profile}
            username={joinRequester.username}
          />
          <JoinRequestInfo padding={paddings[1]}>
            {joinRequester.created_date}
          </JoinRequestInfo>
          <JoinRequestInfo padding={paddings[2]}>
            <Btn
              color={GREEN}
              onClick={() => handleApproveClick(joinRequester.user_id)}
            >
              승인
            </Btn>
          </JoinRequestInfo>
          <JoinRequestInfo padding={paddings[3]}>
            <Btn
              color={PURPLE}
              onClick={() => reject({ user_id: joinRequester.user_id })}
            >
              거절
            </Btn>
          </JoinRequestInfo>
        </List>
      ))}
    </GraphTemplate>
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

const JoinRequestInfo = styled.div`
  margin-left: ${(props) => (props.padding ? `${props.padding}px` : "0px")};
  color: #252733;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
