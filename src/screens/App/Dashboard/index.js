import React from 'react';
import styled from 'styled-components';
import Stats from './stats';
import ActivityList from './activityList';
import { colors, breakpoints } from '../../../styles/theme';
import LineBarAreaComposedChart from './Charts/LineBarAreaComposedChart';
import StackedChart from './Charts/StackedChart';
import AreaChartFillByValue from './Charts/AreaChartFillByValue';
import SimpleBarChart from './Charts/SimpleBarChart';
import PieChartCredits from './Charts/PieChart';

const Title = styled.h1`
  font-weight: 600;
  color: ${colors.gray900};
  font-size: 1.5rem;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: ${breakpoints.large}) {
    grid-template-columns: 1fr;
    align-items: center;
  }
  grid-auto-flow: row;
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;
  margin-top: 2rem;
`;

const Dashboard = () => {
  return (
    <div>
      {/* <Title>Dashboard</Title> */}
      {/* <ChartsContainer>
        <StackedChart />
        <AreaChartFillByValue />
        <SimpleBarChart />
        <PieChart />
      </ChartsContainer> */}
      <header className="bg-white ">
        <nav className="border-t-4 border-blue-500">
          <div className="container flex items-center justify-between px-6 py-3 mx-auto">
            <div>
              <a
                className="text-2xl font-bold text-gray-800  lg:text-3xl hover:text-gray-700 "
                href="#"
              >
                Dashboard
              </a>
            </div>
          </div>
        </nav>

        <div className="container px-6 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-5xl font-semibold text-gray-800  lg:text-5xl">
                  Welcome,<span className="text-blue-500">aboard</span>
                </h1>

                <p className="mt-4 text-gray-600 text-2xl">
                  We're really delighted to have{' '}
                  <span className="font-medium text-blue-500">you</span>
                </p>
              </div>
              <PieChartCredits />
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-full h-full max-w-md"
                src="https://merakiui.com/images/components/Email-campaign-bro.svg"
                alt="email illustration vector art"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Dashboard;
