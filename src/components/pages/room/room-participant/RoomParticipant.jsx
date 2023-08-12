import React, { useState } from "react";
import { styled } from "styled-components";
import GraphTemplate from "../../../commons/GraphTemplate";
import {
  participant_columns,
  participant_paddings,
} from "../../../commons/column-type/participant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteParticipant } from "../../../../api/participant";
import { useErrorHandling } from "../../../../api/useErrorHandling";
import { useApiError } from "../../../../api/useApiError";
import ArrowIcon from "../../../../assets/arrowIcon.svg";
import { useNavigate } from "react-router-dom";
import Profile from "../../../commons/Profile";
import { GREY, PURPLE } from "../../../../colors";

export default function RoomParticipant({
  participants,
  handleClickModal,
  handleParticipantClick,
}) {
  const paddings = participant_paddings;
  const columns = participant_columns;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(
    {
      403: {
        FORBIDDEN: () => alert("방장은 강퇴가 블가능합니다."),
        FORBIDDEN_ADMIN: errorhandling.handleNotAdminError,
      },
    },
    errorhandling
  );

  const { mutate: deleteAParticipant } = useMutation(
    ({ participantId }) => deleteParticipant(participantId),
    {
      retry: 1,
      staleTime: Infinity,
      onError: handleError,
      onSuccess: async () => {
        console.log("[RoomParticipants]: delete participant");
        queryClient.invalidateQueries("participants");
      },
    }
  );

  return (
    <GraphTemplate columns={columns} paddings={paddings}>
      {participants.map((participant) => (
        <List key={participant.participant_id} grid={columns.length}>
          <Profile
            profile={participant.profile}
            username={participant.username}
          />
          <ParticipantInfo padding={paddings[1]}>
            {participant.authority ? `👑` : ""}
          </ParticipantInfo>
          <ParticipantInfo padding={paddings[2]}>
            {parseFloat(participant.percent_sum).toFixed(1) + " %"}
          </ParticipantInfo>
          <ParticipantInfo padding={paddings[3]}>
            {new Intl.NumberFormat("ko-KR").format(participant.refund) + " 원"}
          </ParticipantInfo>
          <ParticipantInfo padding={paddings[4]}>
            {participant.updated_date}
          </ParticipantInfo>
          <ParticipantInfo padding={paddings[5]}>
            <Btn color={GREY} onClick={() => handleClickModal(participant)}>
              수정
            </Btn>
          </ParticipantInfo>
          <ParticipantInfo padding={paddings[6]}>
            <Btn
              color={PURPLE}
              onClick={() =>
                deleteAParticipant({
                  participantId: participant.participant_id,
                })
              }
            >
              강퇴
            </Btn>
            <ArrowButton
              src={ArrowIcon}
              onClick={() => handleParticipantClick(participant.participant_id)}
            />
          </ParticipantInfo>
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

const ParticipantInfo = styled.div`
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

const ArrowButton = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 30px;
  cursor: pointer;
`;
