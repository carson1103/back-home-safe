import "@brainhubeu/react-carousel/lib/style.css";

import Carousel from "@brainhubeu/react-carousel";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import HomeIcon from "@material-ui/icons/Home";
import PlaceIcon from "@material-ui/icons/Place";
import SettingsIcon from "@material-ui/icons/Settings";
import { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Bookmark } from "./Bookmark";
import { Home } from "./Home";
import { Settings } from "./Settings";
import { TravelRecord } from "./TravelRecord";

enum tabs {
  HOME = "HOME",
  TRAVEL_RECORD = "TRAVEL_RECORD",
  SETTINGS = "SETTINGS",
  BOOKMARK = "BOOKMARK",
}

const tabsArr = ({ t }: { t: TFunction }) => [
  {
    key: tabs.HOME,
    label: t("home.name"),
    component: <Home />,
    icon: <HomeIcon />,
  },
  {
    key: tabs.TRAVEL_RECORD,
    label: t("travel_record.name"),
    component: <TravelRecord />,
    icon: <PlaceIcon />,
  },
  {
    key: tabs.BOOKMARK,
    label: t("bookmark.name"),
    component: <Bookmark />,
    icon: <BookmarkIcon />,
  },
  {
    key: tabs.SETTINGS,
    label: t("setting.name"),
    component: <Settings />,
    icon: <SettingsIcon />,
  },
];

const MainScreen = () => {
  const { t } = useTranslation("main_screen");
  const [activePage, setActivePage] = useState(0);
  const tabs = useMemo(() => tabsArr({ t }), [t]);

  return (
    <PageWrapper>
      <Carousel draggable={false} value={activePage}>
        {tabs.map(({ component, key }) => (
          <React.Fragment key={key}>{component}</React.Fragment>
        ))}
      </Carousel>
      <NavWrapper>
        <BottomNavigation
          showLabels
          value={activePage}
          onChange={(event, newValue) => {
            setActivePage(newValue);
          }}
        >
          {tabs.map(({ key, label, icon }) => (
            <BottomNavigationAction key={key} label={label} icon={icon} />
          ))}
        </BottomNavigation>
      </NavWrapper>
    </PageWrapper>
  );
};

export default MainScreen;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .BrainhubCarousel__container,
  .BrainhubCarousel,
  .BrainhubCarousel__trackContainer,
  .BrainhubCarousel__track {
    height: 100%;
  }
`;

const NavWrapper = styled.div`
  flex-shrink: 0;
  box-shadow: 0 0 3.6px 0 rgb(0 0 0 / 13%), 0 0 0.9px 0 rgb(0 0 0 / 11%);
  padding-bottom: 8px;
  background-color: #fff;
  z-index: 1;
`;
