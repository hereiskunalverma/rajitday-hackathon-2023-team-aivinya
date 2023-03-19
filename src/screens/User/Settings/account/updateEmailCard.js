import React from 'react';
import styled from 'styled-components';

import Card from '../../../../components/Common/Card';
import Button from '../../../../components/Common/buttons/PrimaryButton';
import Label from '../../../../components/Common/forms/FieldLabel';
import Input from '../../../../components/Common/forms/TextInput';

const StyledCard = styled(Card)`
  margin-bottom: 2rem;
`;

const Paragraph = styled.p`
  font-weight: 700;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  padding-top: 1.5rem;
`;

const Form = styled.form`
  padding-bottom: 1.5rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

const UpdateEmailCard = ({ handleEmailChange, isEmail, email, updateEmail }) => {
  return (
    <StyledCard className="drop-shadow-xl">
      {!isEmail ? (
        <Paragraph>Email Changes Only Available for Email Signups</Paragraph>
      ) : (
        <Paragraph>Email Changes will reqire Sign-in with new email</Paragraph>
      )}
      <SectionTitle>Update Email</SectionTitle>
      <Form>
        <Label htmlFor="title">
          Email:
          <Input
            type="email"
            onChange={handleEmailChange}
            value={email}
            disabled={isEmail ? false : true}
          />
        </Label>
        <ButtonWrapper>
          <Button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            onClick={updateEmail}
            disabled={isEmail ? false : true}
          >
            Save
          </Button>
        </ButtonWrapper>
      </Form>
    </StyledCard>
  );
};

export default UpdateEmailCard;
