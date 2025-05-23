import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DeleteAccountModal } from "./DeleteAccountModal";
import { useState } from "react";
import { accountApi } from "../../apis/account/AccountApi";

export default function ButtonGroup() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await accountApi.postLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && <DeleteAccountModal onClose={handleCloseModal} />}
      <BtnWrapper>
        <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        <DeleteBtn onClick={handleDelete}>회원탈퇴</DeleteBtn>
      </BtnWrapper>
    </>
  );
}

const BtnWrapper = styled.div`
  margin-top: 1.19rem;
  padding: 0.44rem 0;
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.69rem;
`;

const LogoutBtn = styled.div`
  display: flex;
  height: 1.875rem;
  padding: 0.375rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.625rem;
  background: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background-color: #c8c8c8;
  cursor: pointer;
  &:hover {
    color: #349989;
  }
`;

const DeleteBtn = styled.div`
  display: flex;
  height: 1.875rem;
  padding: 0.375rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.625rem;
  background: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  color: #a4a4a4;
  border: 1px solid #a4a4a4;
  cursor: pointer;
  &:hover {
    color: #349989;
    border: 1px solid #349989;
  }
`;
