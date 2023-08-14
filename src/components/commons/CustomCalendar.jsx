import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Calendar from "react-calendar";
import "./Calendar.css"; // css import
export default function CalendarModal({
  handleShowCalendar,
  handleDateSelect,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    handleDateSelect(selectedDate);
    handleShowCalendar();
  };
  return (
    <ModalWrapper>
      <ModalContent>
        <Calendar
          locale='en-EN'
          onChange={handleDateChange}
          value={selectedDate}
          showNavigation={true}
        />
        <Button onClick={handleConfirm}>확인</Button>
      </ModalContent>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 3px;
  border-radius: 5px;
  cursor: pointer;
`;
