import React from "react";
import { styled } from "styled-components";
import GraphTemplate from "../../../commons/GraphTemplate";
import {
  join_request_columns,
  join_request_paddings,
} from "../../../commons/column-type/participant";
import Profile from "../../../commons/Profile";
import { GREEN, PURPLE } from "../../../../colors";

export default function RoomJoinRequest({ joinRequesters }) {
  const paddings = join_request_paddings;
  const columns = join_request_columns;

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
            <Btn color={GREEN}>승인</Btn>
          </JoinRequestInfo>
          <JoinRequestInfo padding={paddings[3]}>
            <Btn color={PURPLE}>거절</Btn>
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
