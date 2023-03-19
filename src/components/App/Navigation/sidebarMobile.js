import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

import ScrollBar from 'react-perfect-scrollbar';

import useOutsideClick from '../../../hooks/useOutsideClick';
import { colors, breakpoints } from '../../../styles/theme';

import MobileSidebarItem from './mobileSidebarItem';
import Cross from '../svgs/cross';
import LargeLogo from '../../Common/svgs/LargeLogo';
import { THEMES } from '../AppLayout';
import {
  FcBarChart,
  FcCollect,
  FcConferenceCall,
  FcGenealogy,
  FcTimeline,
  FcUpload,
  FcPrivacy,
  FcEngineering
} from 'react-icons/fc';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 40;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
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

const FixedDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const AbsoluteDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${colors.gray600};
  opacity: 0.75;
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: linear;
`;

const showMobileSidebar = keyframes`
  from {
    transform: scaleX(0);
    transform-origin: left center;
  }
  to {
    transform: scaleX(100%);
    transform-origin: left center;
  }
`;

const Wrapper3 = styled.div`
  animation: ${showMobileSidebar} 0.5s ease-in-out;
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  max-width: 256px;
  width: 100%;
  background-color: #1f2937;
`;

const Sidebar = styled.div`
  flex: 1 1 0%;
  height: 0;
  padding-bottom: 1rem;
  overflow-y: auto;
  background-color: #1f2937;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: -3.5rem;
  padding: 0.25rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  &:hover {
    background-color: ${colors.gray600};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const LogoWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1rem;
  box-shadow: 0 1px 9px -3px rgba(0, 0, 0, 0.2);
  height: 72px;
`;

const Nav = styled.nav`
  padding: 24px 0;
`;

const ShrinkDiv = styled.div`
  flex-shrink: 0;
`;

const Wrapper4 = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: calc(100% - 55px);
  overflow: hidden;
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

const StyledEmail = () => {
  return (
    <img
      src="https://img.icons8.com/color/48/000000/sync-with-mailchimp.png"
      height={30}
      width={30}
    />
  );
};

const StyledTechDev = () => {
  return (
    <img src="https://img.icons8.com/color/96/000000/developer--v1.png" height={35} width={35} />
  );
};

const StyledChatBot = () => {
  return (
    <img
      src="https://img.icons8.com/color/48/000000/speech-bubble-with-dots.png"
      height={30}
      width={30}
    />
  );
};
const StyledAIContent = () => {
  return <img src="https://img.icons8.com/color/48/000000/ai.png" height={30} width={30} />;
};

const StyledBar = () => {
  return (
    <img src="https://img.icons8.com/color/48/000000/dashboard-layout.png" height={30} width={30} />
  );
};

const StyledEng = () => {
  return <img src="https://img.icons8.com/color-glass/96/000000/gear.png" height={25} width={25} />;
};

const StyledAnalytics = () => {
  return <img src="https://img.icons8.com/color/48/000000/analytics.png" height={30} width={30} />;
};

const StyledCollab = () => {
  return (
    <img
      src="https://img.icons8.com/color/96/000000/staff-skin-type-7.png"
      height={25}
      width={25}
    />
  );
};

const StyledCreate = styled(FcUpload)`
  height: 1.3rem;
  width: 1.3rem;
`;

const StyledPermissions = () => {
  return <img src="https://img.icons8.com/color/96/000000/privacy.png" height={26} width={26} />;
};

const StyledOnboarding = () => {
  return (
    <img
      src="https://img.icons8.com/color/96/000000/knowledge-transfer.png"
      height={25}
      width={25}
    />
  );
};

const StyledML = styled(FcGenealogy)`
  height: 1.3rem;
  width: 1.3rem;
`;

const StyledFeature = () => {
  return (
    <img src="https://img.icons8.com/color/96/000000/approval--v1.png" height={25} width={25} />
  );
};

const StyledBugReport = () => {
  return <img src="https://img.icons8.com/color/96/000000/biohazard.png" height={25} width={25} />;
};

const StyledUGC = () => {
  return (
    <img src="https://img.icons8.com/color/48/000000/connected-people.png" height={30} width={30} />
  );
};

const StyledAivinyaCanvas = () => {
  return <img src="https://img.icons8.com/fluency/96/000000/chatbot.png" height={30} width={30} />;
};

const StyledAivaDisplay = () => {
  return (
    <img src="https://cdn-icons-png.flaticon.com/512/8002/8002135.png" height={30} width={30} />
  );
};

const StyledAiWriter = () => {
  return <img src="https://img.icons8.com/color/96/000000/pen.png" height={30} width={30} />;
};

const StyledAiRexis = () => {
  return <img src="https://img.icons8.com/fluency/96/000000/chatbot.png" height={30} width={30} />;
};

const StyledAiGrammar = () => {
  return <img src="https://img.icons8.com/color/96/000000/grammar.png" height={30} width={30} />;
};
const StyledAiSummarizer = () => {
  return <img src="https://img.icons8.com/fluency/96/000000/brief.png" height={30} width={30} />;
};

const StyledAiFreegiarism = () => {
  return (
    <img
      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-plagiarism-literature-flaticons-lineal-color-flat-icons-3.png"
      height={30}
      width={30}
    />
  );
};

const StyledAiSentiment = () => {
  return (
    <img
      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-emotion-comfort-flaticons-lineal-color-flat-icons-2.png"
      height={30}
      width={30}
    />
  );
};

const StyledAff = () => {
  return (
    <img
      src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/000000/external-affiliate-seo-and-marketing-nawicon-outline-color-nawicon.png"
      height={30}
      width={30}
    />
  );
};

const SidebarMobile = ({ toggleMobileMenu, org_id, theme, toggleTheme }) => {
  const ref = useRef();
  useOutsideClick(ref, () => toggleMobileMenu(false));

  return (
    <Wrapper>
      <FixedDiv>
        <AbsoluteDiv />
      </FixedDiv>
      <Wrapper3 ref={ref} theme={theme}>
        <ButtonWrapper>
          <Button onClick={() => toggleMobileMenu(false)} aria-label="Close sidebar">
            <Cross />
          </Button>
        </ButtonWrapper>
        <Sidebar>
          <LogoWrapper>
            <span className="text-3xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600  animate-text">
              <span className="text-5xl">Ai</span>vinya
            </span>
          </LogoWrapper>
          <Wrapper4>
            <SidebarItems style={{ backgroundColor: '#1F2937' }}>
              <ScrollBar options={{ suppressScrollX: true }}>
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/dashboard`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledBar />}
                  title="Dashboard"
                  style={{ color: 'white' }}
                />
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/aiwriter`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledAiWriter />}
                  title="AI Writer"
                  style={{ color: 'white' }}
                />
                {/* <MobileSidebarItem
                // theme={theme}
                link={`/app/${org_id}/airexis`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<StyledAiRexis/>}
                title="AI Rexis"
                style={{ color: 'white' }}
              /> */}
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/aigrammar`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledAiGrammar />}
                  title="Grammarly"
                  style={{ color: 'white' }}
                />

                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/aisummarizer`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledAiSummarizer />}
                  title="AI Summarizer"
                  style={{ color: 'white' }}
                />
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/aifreegiarism`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledAiFreegiarism />}
                  title="AI Paraphraser"
                  style={{ color: 'white' }}
                />
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/aisentiment`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledAiSentiment />}
                  title="AI Sentiment"
                  style={{ color: 'white' }}
                />
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/aivachat`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledAivinyaCanvas />}
                  title="AivaChat"
                  style={{ color: 'white' }}
                />
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/integrations`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledAnalytics />}
                  title="Integrations"
                  style={{ color: 'white' }}
                />
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/settings`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledEng />}
                  title="Settings"
                  style={{ color: 'white' }}
                />
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/affiliate`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledAff />}
                  title="Free Credits"
                  style={{ color: 'white' }}
                />
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/featurerequest`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledFeature />}
                  title="Feature Request"
                  style={{ color: 'white' }}
                />
                <MobileSidebarItem
                  // theme={theme}
                  link={`/app/${org_id}/bugreportpage`}
                  toggleMenu={() => toggleMobileMenu(false)}
                  svg={<StyledBugReport />}
                  title="Bug Report"
                  style={{ color: 'white' }}
                />
                {/* <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/readupdate`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcCollect />}
                title="Read Update"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/create`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcUpload />}
                title="Create"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/permissions`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcPrivacy />}
                title="Permissions"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/users`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcConferenceCall />}
                title="Users"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/onboarding`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcTimeline />}
                title="Onboarding"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/machinelearning`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcGenealogy />}
                title="Machine Learning"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/settings`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcEngineering />}
                title="Settings"
              /> */}
              </ScrollBar>
            </SidebarItems>

            {/* <Footer>
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
            </Footer> */}
          </Wrapper4>
        </Sidebar>
      </Wrapper3>
      {/*<!-- Force sidebar to shrink to fit close icon -->*/}
      <ShrinkDiv />
    </Wrapper>
  );
};

export default SidebarMobile;
