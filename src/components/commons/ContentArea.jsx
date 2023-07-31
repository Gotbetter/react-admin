import { styled } from "styled-components";
import MenuBar from "./MenuBar";
import Header from "./Header";

export default function ContentArea({ tab, title }) {
    return (
        <Layout>
            <MenuBar tab={tab}></MenuBar>
            <Header title={title}>{'대시보드 (예정)'}</Header>
        </Layout>
    );
}

const Layout = styled.div`
    display: flex;
    flex-direction: row;
`;