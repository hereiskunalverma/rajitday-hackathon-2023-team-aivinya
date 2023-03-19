import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundLanding};
`;

const Partnership = () => {
  return (
    <Container className="px-3">
      <div className="flex flex-col justify-center">
        <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
          <div className="text-white pb-10">
            <img
              width="400"
              height="300"
              src="https://m-img.org/spai/w_294+q_lossless+ret_img+to_webp/https://static.matomo.org/wp-content/uploads/2020/03/matomo-logo-winner-mobile3.png"
              alt="tiledesk"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Partnership;
