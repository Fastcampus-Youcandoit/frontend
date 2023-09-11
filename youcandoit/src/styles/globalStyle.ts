import { createGlobalStyle } from "styled-components/dist/base";
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
`;

export default GlobalStyle;
