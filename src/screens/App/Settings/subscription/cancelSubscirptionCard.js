import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AlertMessage from 'LandingUI/components/alert';
import Card from '../../../../components/Common/Card';
import DangerButton from '../../../../components/Common/buttons/DangerButton';
import { useRouter } from 'next/router';

const CancelSubscriptionButton = styled(DangerButton)`
  width: max-content;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
`;

const CancelSubscriptionCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleCancel = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user) {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;
      await axios
        .post(
          `${url}api/stripe/get-portal-session`,
          {
            userId: user.id
          },
          {
            headers: {
              Authorization: `Bearer ${user.jwt_token}`
            }
          }
        )
        .then((res) => {
          AlertMessage('Redirecting to Customer Portal...', 'info');
          console.log(res);
          if (res.data.sucess) {
            router.push(res.data.url);
          }
        })
        .catch((err) => {
          AlertMessage('Error', 'error');
          console.log(err);
        });
    }
  };
  return (
    <Card>
      <SectionTitle>Manage Subscription</SectionTitle>
      <CancelSubscriptionButton onClick={() => handleCancel()}>
        {loading ? 'Please Wait' : 'Manage'}
      </CancelSubscriptionButton>
    </Card>
  );
};

export default CancelSubscriptionCard;
