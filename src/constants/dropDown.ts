import gelleryBlack from "../assets/icons/header_icon/header_gellery_black_icon.png";
import wikiBlack from "../assets/icons/header_icon/header_wiki_black_icon.png";
import noticeIcon from "../assets/icons/header_icon/header_notice_icon.png";
import loginIcon from "../../assets/icons/header_icon/header_login_icon.png";
import logoutIcon from "../../assets/icons/header_icon/header_logout_icon.png";

export const HEADER_MENU_ITEMS = [
  {
    id: 0,
    path: "/notice",
    icon: noticeIcon,
    alt: "notice icon",
    name: "notice",
  },
  {
    id: 1,
    path: "/wiki",
    icon: wikiBlack,
    alt: "wiki icon",
    name: "wiki",
  },
  {
    id: 2,
    path: "/gallery/all",
    icon: gelleryBlack,
    alt: "gallery icon",
    name: "gallery",
  },
];
