import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
        text-decoration: none;
    }
    body{
        color: black;
        list-style: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    iframe#webpack-dev-server-client-overlay{display:none!important}
`;

export default GlobalStyle;
