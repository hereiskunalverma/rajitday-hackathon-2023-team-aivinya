import React from 'react';
import styled from 'styled-components';
import {
  FcBarChart,
  FcCollect,
  FcConferenceCall,
  FcGenealogy,
  FcTimeline,
  FcUpload,
  FcPrivacy,
  FcApproval,
  FcBiohazard,
  FcEngineering,
  FcAddressBook,
  FcTemplate,
  FcAssistant,
  FcSerialTasks
} from 'react-icons/fc';

import { useState, useEffect } from 'react';
import { EditorState, ContentState, RawDraftContentState } from 'draft-js';

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

const StyledAivinyaCanvas = () => {
  return (
    <img
      src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/64/000000/external-canvas-art-and-design-xnimrodx-blue-xnimrodx-3.png"
      height={30}
      width={30}
    />
  );
};

const StyledIntegrations = () => {
  return (
    <img
      src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/65/null/external-Integration-data-and-network-smashingstocks-circular-smashing-stocks.png"
      height={30}
      width={30}
    />
  );
};

const StyledAivaDisplay = () => {
  return (
    <img src="https://cdn-icons-png.flaticon.com/512/8002/8002135.png" height={30} width={30} />
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

const StyledRexis = () => {
  return <img src="https://img.icons8.com/fluency/96/000000/chatbot.png" height={30} width={30} />;
};

export const getMenus = (org_id) => {
  return [
    {
      id: '1',
      name: 'Dashboard',
      route: `/app/${org_id}/dashboard`,
      icon: <StyledBar />
    },
    {
      id: '19',
      name: 'AI Content',
      route: `/app/${org_id}/aicontent`,
      icon: <StyledAIContent />
    },
    {
      id: '2',
      name: 'AivaChat',
      route: `/app/${org_id}/aivachat`,
      icon: <StyledRexis />
    },
    {
      id: '3',
      name: 'Integations',
      route: `/app/${org_id}/integrations`,
      icon: <StyledIntegrations />
    },
    // {
    //   id: '22',
    //   name: 'Aivinya Canvas' ,
    //   route: `/app/${org_id}/aivinyacanvas`,
    //   icon: <StyledAivinyaCanvas />
    // },

    // {
    //   id: '13',
    //   name: 'Chatbot',
    //   route: `/app/${org_id}/chatbot`,
    //   icon: <StyledChatBot/>
    // },

    // {
    //   id: '5',
    //   name: 'Permissions',
    //   route: `/app/${org_id}/permissions`,
    //   icon: <StyledPermissions />
    // },
    // {
    //   id: '6',
    //   name: 'Users',
    //   route: `/app/${org_id}/users`,
    //   icon: <StyledCollab />
    // },
    // {
    //   id: '7',
    //   name: 'Onboarding',
    //   route: `/app/${org_id}/onboarding`,
    //   icon: <StyledOnboarding />
    // },

    {
      id: '11',
      name: 'Bug Report',
      route: `/app/${org_id}/bugreportpage`,
      icon: <StyledBugReport />
    }
  ];
};
