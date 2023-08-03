import { styled } from "styled-components";
import MenuBar from "./MenuBar";
import Header from "./Header";

export default function ContentArea({ tab, title, children }) {
    return (
        <Layout>
            <MenuBar tab={tab} />
            <Header title={title} children={children} />
        </Layout>
    );
}

const Layout = styled.div`
    display: flex;
    flex-direction: row;
`;