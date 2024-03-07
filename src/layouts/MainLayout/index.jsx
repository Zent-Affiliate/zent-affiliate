import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import SideBar from "./SiderBar";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {goToPageSuccess, handleSetIsShowSideBar} from "@/states/modules/app";
import useWindowSize from '@/utils/hooks/useWindowSize';
import {classNames} from '@/utils/helper';

function MainLayout(props) {
  const {children} = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isShowSideBar = useSelector(state => state.app.isShowSideBar);
  const isThemeLight = useSelector(state => state.app.isThemeLight);
  const goToPage = useSelector(state => state.app.goToPage);
  const location = useSelector(state => state.app.location);
  
  const windowSize = useWindowSize()
  
  useEffect(() => {
    if (goToPage.path && !goToPage.redirected) {
      dispatch(goToPageSuccess());
      navigate(goToPage.path);
    }
  }, [goToPage, navigate, dispatch]);
  
  useEffect(() => {
    if (windowSize.width <= 576) {
      setTimeout(() => dispatch(handleSetIsShowSideBar(false)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  
  return (
    <div className={`${styles.boxMainLayout}`}>
      <div className={styles.headerBox}></div>
      <div className={styles.mainLayoutWrap}>
        <SideBar
          isThemeLight={isThemeLight}
          isShowSideBar={isShowSideBar}
        />
        <div className={`${styles.mainWrap} ${!isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ''}`}>
          <Header
            isShowSideBar={isShowSideBar}
          />
          <main className={styles.mainContentWrap}>
            <div id='contentOfMainLayout' className={classNames(styles.content, props.className)}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
