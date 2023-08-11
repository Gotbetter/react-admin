import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useQueryClient } from "react-query";
import { useErrorHandling } from "../../../../api/useErrorHandling";
import { useApiError } from "../../../../api/useApiError";
import { GREY, YELLOW } from "../../../../colors";

export default function UpdateParticipantModal({
  handleClickModal,
  participant,
}) {
  const [participantInfo, setParticipantInfo] = useState(undefined);

  //   const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  //   const { mutate: updateRoomInfo } = useMutation(
  //     (roomInfo) => updateRoom(room.room_id, roomInfo),
  //     {
  //       retry: 1,
  //       onError: handleError,
  //       onSuccess: async () => {
  //         console.log("[RoomInfo]: update room info");
  //         handleClickModal({});
  //         queryClient.invalidateQueries("oneRoom");
  //       },
  //     }
  //   );

  //   const handleParticipantUpdate = () => {
  //     let changable = false;
  //     if (participantInfo.percent_sum !== participant.percent_sum) {
  //       changable = true;
  //     }
  //     if (participantInfo.refund !== participant.refund) {
  //       changable = true;
  //     }
  //     if (changable) {
  //       console.log("true");
  //       //   updateParticipantInfo(participantInfo);
  //     } else {
  //       console.log("false");
  //       handleClickModal({});
  //     }
  //   };

  useEffect(() => {
    if (participantInfo === undefined) {
      setParticipantInfo(participant);
    }
    console.log(participantInfo);
  }, [participant, participantInfo]);

  return (
    <>
      {participantInfo !== undefined && (
        <ModalOutside>
          <WhiteBox>
            <ProfileWrapper>
              <ProfileImage>
                <img
                  src={"data:image/png;base64," + participantInfo.profile}
                  alt=''
                />
              </ProfileImage>
            </ProfileWrapper>
            <ParticipantInfoWrapper>
              닉네임
              <TextInput
                type='text'
                defaultValue={participantInfo.username}
                readOnly={true}
              />
            </ParticipantInfoWrapper>

            <ParticipantInfoWrapper>
              방장
              <TextInput
                type='text'
                defaultValue={participantInfo.authority ? "TRUE" : "FALSE"}
                readOnly={true}
              />
            </ParticipantInfoWrapper>
            <ParticipantInfoWrapper>
              수행 정도(%)
              <TextInput
                type='number'
                defaultValue={parseFloat(participantInfo.percent_sum).toFixed(
                  1
                )}
                readOnly={true}
              />
            </ParticipantInfoWrapper>
            <ParticipantInfoWrapper>
              환급금(원)
              <TextInput
                type='number'
                defaultValue={new Intl.NumberFormat("ko-KR").format(
                  participantInfo.refund
                )}
                readOnly={true}
              />
            </ParticipantInfoWrapper>
            <ParticipantInfoWrapper>
              수정 날짜
              <TextInput
                type='text'
                defaultValue={participantInfo.updated_date}
                readOnly={true}
              />
            </ParticipantInfoWrapper>
            <ButtonWrapper>
              <Btn color={GREY} onClick={() => handleClickModal({})}>
                취소
              </Btn>
              <Btn color={GREY} onClick={() => handleClickModal({})}>
                수정
              </Btn>
            </ButtonWrapper>
          </WhiteBox>
        </ModalOutside>
      )}
    </>
  );
}
// onClick={handleRoomUpdate}
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

const ParticipantInfoWrapper = styled.div`
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

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const ProfileImage = styled.div`
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
