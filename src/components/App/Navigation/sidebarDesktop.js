import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Layout, Menu, Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import Link from 'next/link';

import LargeLogo from '../../Common/svgs/LargeLogo';
import SmallLogo from '../../Common/svgs/SmallLogo';
import { THEMES } from '../AppLayout';
import { colors, breakpoints } from '../../../styles/theme';
import { getMenus } from './menuConfig';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Credits from 'LandingUI/components/Credits';

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const StyledSider = styled(Layout.Sider)`
  display: none;

  @media (min-width: ${breakpoints.medium}) {
    display: initial;
  }
  box-shadow: fade(${colors.doveGray}, 10%) 0 0 28px 0;
  z-index: 10;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 72px;
  box-shadow: 0 1px 9px -3px rgba(0, 0, 0, 0.2);
`;

const SidebarItems = styled.div`
  height: 'calc(100vh - 120px)';
  overflow-x: hidden;
  flex: 1;
  padding: 24px 0;

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .ant-menu-inline {
    border-right: none;
  }
`;

const StyledLink = styled.a`
  display: flex;
`;

const ItemWrapper = styled.div`
  font-size: 15px;
  color: white;
`;

const Footer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  overflow: hidden;
  transition: all 0.3s;

  span {
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
  }

  .anticon {
    min-width: 14px;
    margin-right: 4px;
    font-size: 14px;
  }
`;

const Bulb = styled(BulbOutlined)`
  color: ${colors.doveGray};
`;

const Span = styled.span`
  color: ${colors.doveGray};
`;

const SidebarDesktop = ({ theme, toggleTheme, org_id, location, collapsed }) => {
  const [currentTab, setCurrentTab] = useState('Dashboard');
  const [currentUGCTab, setcurrentUGCTab] = useState('Dashboard');
  const [currentAIContentTab, setcurrentAIContentTab] = useState('Dashboard');

  const [ugcMenu, setUgcMenu] = useState(false);
  const [aiContentMenu, setAIContentMenu] = useState(false);

  const menus = getMenus(org_id);
  const selectedKey = menus.find((menu) => menu.route === location.asPath);
  return (
    <StyledSider
      width={200}
      theme={theme}
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ backgroundColor: '#1F2937' }}
    >
      <LogoWrapper>
        {/* <span className="text-3xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600  animate-text">
          <span className="text-5xl">Ai</span>vinya
        </span> */}
        <div className="text-center content-center m-auto">
          <img src="/img/logo_withoutname.png" height={60} width={60} />
        </div>
      </LogoWrapper>
      <SidebarItems style={{ backgroundColor: '#1F2937' }}>
        <ScrollBar options={{ suppressScrollX: true }}>
          <Menu
            mode="inline"
            theme={theme}
            selectedKeys={[selectedKey && selectedKey.id]}
            style={{ backgroundColor: '#1F2937' }}
          >
            {menus.map(({ id, route, icon, name }) =>
              name === 'UGC' || name === 'AI Content' ? (
                <>
                  {name === 'UGC' && (
                    <Menu.Item
                      key={id}
                      title={name}
                      style={{ backgroundColor: '#1F2937' }}
                      onClick={() => {
                        setUgcMenu(!ugcMenu);
                        setCurrentTab('UGC');
                        setcurrentUGCTab('none');
                      }}
                    >
                      <StyledLink>
                        {/* UGC ICON */}
                        <StyledIcon>{icon}</StyledIcon>
                        {!collapsed && (
                          <ItemWrapper>
                            {name} {!ugcMenu ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}{' '}
                          </ItemWrapper>
                        )}
                      </StyledLink>
                    </Menu.Item>
                  )}

                  {name === 'AI Content' && (
                    <Menu.Item
                      key={id}
                      title={name}
                      style={{ backgroundColor: '#1F2937' }}
                      onClick={() => {
                        setAIContentMenu(!aiContentMenu);
                        setCurrentTab('AI Content');
                        setcurrentAIContentTab('none');
                      }}
                    >
                      <StyledLink>
                        {/* AI CONTENT ICON */}
                        <StyledIcon>{icon}</StyledIcon>
                        {!collapsed && (
                          <ItemWrapper>
                            {name}{' '}
                            {!aiContentMenu ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}{' '}
                          </ItemWrapper>
                        )}
                      </StyledLink>
                    </Menu.Item>
                  )}

                  {name === 'UGC' && ugcMenu && (
                    <>
                      <Menu.Item
                        style={
                          currentTab === 'UGC' && currentUGCTab === 'Dashboard'
                            ? { backgroundColor: '#334155' }
                            : { backgroundColor: '#1F2937' }
                        }
                        onClick={() => {
                          setCurrentTab('UGC');
                          setcurrentUGCTab('Dashboard');
                        }}
                      >
                        <Link href={route.slice(0, -3) + 'ugcDashboard' || '#'} passHref>
                          <StyledLink>
                            &nbsp; &nbsp;
                            {/* UGC DASHBOARD ICON */}
                            <StyledIcon>
                              <img
                                src="https://img.icons8.com/external-anggara-filled-outline-anggara-putra/32/000000/external-dashboard-ui-basic-anggara-filled-outline-anggara-putra.png"
                                width={25}
                                height={25}
                              />
                            </StyledIcon>
                            {!collapsed && <ItemWrapper> Dashboard</ItemWrapper>}
                          </StyledLink>
                        </Link>
                      </Menu.Item>

                      <Menu.Item
                        style={
                          currentTab === 'UGC' && currentUGCTab === 'Sources'
                            ? { backgroundColor: '#334155' }
                            : { backgroundColor: '#1F2937' }
                        }
                        onClick={() => {
                          setCurrentTab('UGC');
                          setcurrentUGCTab('Sources');
                        }}
                      >
                        <Link href={route.slice(0, -3) + 'ugcSources' || '#'} passHref>
                          <StyledLink>
                            &nbsp; &nbsp;
                            {/* UGC SOURCES ICON */}
                            <StyledIcon>
                              <img
                                src="https://img.icons8.com/dusk/64/000000/open-source.png"
                                width={25}
                                height={25}
                              />
                            </StyledIcon>
                            {!collapsed && <ItemWrapper>Sources</ItemWrapper>}
                          </StyledLink>
                        </Link>
                      </Menu.Item>

                      {/* <Menu.Item style={ currentTab === 'UGC' && currentUGCTab === 'Layout' ? {backgroundColor: "#334155"} : {backgroundColor: "#1F2937"}} onClick={() => {
                  setCurrentTab("UGC")
                  setcurrentUGCTab("Layout")
                }}>
                <Link href={(route.slice(0,-3) + "ugcLayout") || '#'} passHref>
                  <StyledLink>
                  &nbsp; &nbsp;
              
                  <StyledIcon>{icon}</StyledIcon>
                  {!collapsed && <ItemWrapper>Layout</ItemWrapper>}
                  </StyledLink>
                  </Link>
                </Menu.Item> */}

                      <Menu.Item
                        style={
                          currentTab === 'UGC' && currentUGCTab === 'Embed Display'
                            ? { backgroundColor: '#334155' }
                            : { backgroundColor: '#1F2937' }
                        }
                        onClick={() => {
                          setCurrentTab('UGC');
                          setcurrentUGCTab('Embed Display');
                        }}
                      >
                        <Link href={route.slice(0, -3) + 'ugcembeddisplay' || '#'} passHref>
                          <StyledLink>
                            &nbsp; &nbsp;
                            {/* UGC EMBED DISPLAY ICON */}
                            <StyledIcon>
                              <img
                                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-display-technology-ecommerce-flaticons-lineal-color-flat-icons.png"
                                width={25}
                                height={25}
                              />
                            </StyledIcon>
                            {!collapsed && <ItemWrapper>Embed Display</ItemWrapper>}
                          </StyledLink>
                        </Link>
                      </Menu.Item>

                      <Menu.Item
                        style={
                          currentTab === 'UGC' && currentUGCTab === 'Analytics'
                            ? { backgroundColor: '#334155' }
                            : { backgroundColor: '#1F2937' }
                        }
                        onClick={() => {
                          setCurrentTab('UGC');
                          setcurrentUGCTab('Analytics');
                        }}
                      >
                        <Link href={route.slice(0, -3) + 'ugcanalytics' || '#'} passHref>
                          <StyledLink>
                            &nbsp; &nbsp;
                            {/* UGC ANALYTICS ICON */}
                            <StyledIcon>
                              <img
                                src="https://img.icons8.com/external-flat-wichaiwi/64/000000/external-analysis-statistical-analysis-flat-wichaiwi.png"
                                width={25}
                                height={25}
                              />
                            </StyledIcon>
                            {!collapsed && <ItemWrapper>Analytics</ItemWrapper>}
                          </StyledLink>
                        </Link>
                      </Menu.Item>
                    </>
                  )}

                  {/* AI CONTENT OPTIONS  */}
                  {name === 'AI Content' && aiContentMenu && (
                    <>
                      <Menu.Item
                        style={
                          currentTab === 'AI Content' && currentAIContentTab === 'AIContentOption1'
                            ? { backgroundColor: '#334155' }
                            : { backgroundColor: '#1F2937' }
                        }
                        onClick={() => {
                          setCurrentTab('AI Content');
                          setcurrentAIContentTab('AIContentOption1');
                        }}
                      >
                        <Link href={route.slice(0, -9) + 'aiwriter' || '#'} passHref>
                          <StyledLink>
                            &nbsp; &nbsp;
                            {/* AI Writer ICON */}
                            <StyledIcon>
                              <img
                                src="https://img.icons8.com/color/96/000000/pen.png"
                                width={25}
                                height={25}
                              />
                            </StyledIcon>
                            {!collapsed && <ItemWrapper>AI Writer</ItemWrapper>}
                          </StyledLink>
                        </Link>
                      </Menu.Item>

                      {/* AI REXIS */}
                      {/*                       
                      <Menu.Item
                        style={
                          currentTab === 'AI Content' && currentAIContentTab === 'AIContentOption2'
                            ? { backgroundColor: '#334155' }
                            : { backgroundColor: '#1F2937' }
                        }
                        onClick={() => {
                          setCurrentTab('AI Content');
                          setcurrentAIContentTab('AIContentOption2');
                        }}
                      >
                        
                        <Link href={route.slice(0, -9) + 'airexis' || '#'} passHref>
                          <StyledLink>
                            &nbsp; &nbsp;
                           
                            <StyledIcon>
                              <img
                                src="https://img.icons8.com/fluency/96/000000/chatbot.png"
                                width={25}
                                height={25}
                              />
                            </StyledIcon>
                            {!collapsed && <ItemWrapper>AI Rexis</ItemWrapper>}
                          </StyledLink>
                        </Link>
                      </Menu.Item> */}

                      <Menu.Item
                        style={
                          currentTab === 'AI Content' && currentAIContentTab === 'AIContentOption3'
                            ? { backgroundColor: '#334155' }
                            : { backgroundColor: '#1F2937' }
                        }
                        onClick={() => {
                          setCurrentTab('AI Content');
                          setcurrentAIContentTab('AIContentOption3');
                        }}
                      >
                        <Link href={route.slice(0, -9) + 'aigrammar' || '#'} passHref>
                          <StyledLink>
                            &nbsp; &nbsp;
                            {/* AI Grammar ICON */}
                            <StyledIcon>
                              <img
                                src="https://img.icons8.com/color/96/000000/grammar.png"
                                width={25}
                                height={25}
                              />
                            </StyledIcon>
                            {!collapsed && <ItemWrapper>Grammarly</ItemWrapper>}
                          </StyledLink>
                        </Link>
                      </Menu.Item>

                      <Menu.Item
                        style={
                          currentTab === 'AI Content' && currentAIContentTab === 'AIContentOption4'
                            ? { backgroundColor: '#334155' }
                            : { backgroundColor: '#1F2937' }
                        }
                        onClick={() => {
                          setCurrentTab('AI Content');
                          setcurrentAIContentTab('AIContentOption4');
                        }}
                      >
                        <Link href={route.slice(0, -9) + 'aisummarizer' || '#'} passHref>
                          <StyledLink>
                            &nbsp; &nbsp;
                            {/* AI Summarizer ICON */}
                            <StyledIcon>
                              <img
                                src="https://img.icons8.com/fluency/96/000000/brief.png"
                                width={25}
                                height={25}
                              />
                            </StyledIcon>
                            {!collapsed && <ItemWrapper>AI Summarizer</ItemWrapper>}
                          </StyledLink>
                        </Link>
                      </Menu.Item>

                      <Menu.Item
                        style={
                          currentTab === 'AI Content' && currentAIContentTab === 'AIContentOption5'
                            ? { backgroundColor: '#334155' }
                            : { backgroundColor: '#1F2937' }
                        }
                        onClick={() => {
                          setCurrentTab('AI Content');
                          setcurrentAIContentTab('AIContentOption5');
                        }}
                      >
                        <Link href={route.slice(0, -9) + 'aifreegiarism' || '#'} passHref>
                          <StyledLink>
                            &nbsp; &nbsp;
                            {/* AI Freegiarism ICON */}
                            <StyledIcon>
                              <img
                                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-plagiarism-literature-flaticons-lineal-color-flat-icons-3.png"
                                width={25}
                                height={25}
                              />
                            </StyledIcon>
                            {!collapsed && <ItemWrapper>AI Paraphraser</ItemWrapper>}
                          </StyledLink>
                        </Link>
                      </Menu.Item>
                    </>
                  )}
                </>
              ) : (
                <Menu.Item
                  key={id}
                  title={name}
                  style={
                    currentTab === name
                      ? { backgroundColor: '#334155' }
                      : { backgroundColor: '#1F2937' }
                  }
                  onClick={() => setCurrentTab(name)}
                >
                  <Link href={route || '#'} passHref>
                    <StyledLink>
                      <StyledIcon>{icon}</StyledIcon>
                      {!collapsed && <ItemWrapper>{name}</ItemWrapper>}
                    </StyledLink>
                  </Link>
                </Menu.Item>
              )
            )}
          </Menu>
        </ScrollBar>
      </SidebarItems>

      {/* {!collapsed && (
        <Footer>
          <span>
            <Bulb />
            <Span theme={theme}>Switch Theme</Span>
          </span>
          <Switch
            onChange={toggleTheme}
            defaultChecked={theme === THEMES.DARK}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </Footer>
      )} */}
      <LogoWrapper></LogoWrapper>
    </StyledSider>
  );
};

export default SidebarDesktop;
