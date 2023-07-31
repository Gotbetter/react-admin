import React from "react";
import styled from "styled-components";
import ContentArea from "../../commons/ContentArea";

export default function AdminPage() {

    return (
        <ContentArea tab={'/admins'} title={'관리자'}></ContentArea>
    );
}