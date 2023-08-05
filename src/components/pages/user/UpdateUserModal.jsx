import { useEffect } from "react";
import { styled } from "styled-components";
import { GREY, YELLOW } from "../../../colors";

export default function UpdateUserModal({ isClicked, handleClickModal, user }) {
  console.log(user);

  // const { mutate: updateRoleType } = useMutation(({userId, approve}) => adminChangeReuqest(userId, {approve: approve}), {
  //     onSuccess: async (res) => {
  //         console.log('[AdminPage]: update role type');
  //         queryClient.invalidateQueries('users');
  //     },
  //     onError: (err) => {
  //         const { status } = err.response;
  //         if (status === 400) {
  //           alert('모든 정보를 입력해 주세요.');
  //         }
  //         if (status === 403) {
  //           alert('메인 관리자가 아닙니다.');
  //         }
  //         if (status === 404) {
  //           alert('존재하지 않는 회원입니다.');
  //         }
  //         if (status === 409) {
  //           alert('이미 수정된 정보입니다.');
  //         }
  //     },

  // });

  useEffect(() => {
    if (!isClicked) {
    }
  });
  return (
    <div>
      {isClicked && (
        <ModalOutside>
          <WhiteBox>
            <ProfileWrapper>
              <ProfileImage>
                <img src={"data:image/png;base64," + user.profile} alt="" />
              </ProfileImage>
            </ProfileWrapper>
            <BtnProfile color={GREY}>프로필 수정</BtnProfile>
            <UserInfoWrapper>
              닉네임
              <TextInput type="text" placeholder={user.username} />
            </UserInfoWrapper>
            <UserInfoWrapper>
              이메일
              <TextInput type="text" placeholder={user.email} readOnly />
            </UserInfoWrapper>
            <UserInfoWrapper>
              권한
              <TextInput type="text" placeholder={user.role_type} readOnly />
            </UserInfoWrapper>
            <UserInfoWrapper>
              수정 날짜
              <TextInput type="text" placeholder={user.updated_date} readOnly />
            </UserInfoWrapper>
            <ButtonWrapper>
              <Btn color={GREY} onClick={() => handleClickModal({})}>
                취소
              </Btn>
              <Btn color={YELLOW}>수정</Btn>
            </ButtonWrapper>
          </WhiteBox>
        </ModalOutside>
      )}
    </div>
  );
}

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
  width: 380px;
  height: 582px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
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

const UserInfoWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const BtnProfile = styled.button`
  width: 80px;
  height: 24px;
  background-color: ${(props) => (props.color ? `${props.color}` : "black")};
  color: white;
  text-align: center;
  font-size: 11px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  letter-spacing: 0.2px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px;
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

const TextInput = styled.input`
  width: 150px;
  height: 30px;
  padding: 10px;
  fill: #fff;
  margin: 10px 0;
  border-radius: 8px;
  color: #bdbdbd;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  font-variant-numeric: lining-nums proportional-nums;
  margin: 5px;
`;
