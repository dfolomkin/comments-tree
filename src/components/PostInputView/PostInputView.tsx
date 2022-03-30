import React from 'react';
import { Flex, Box } from 'reflexbox';

import { TEXT } from '../../common/constants';

import {
  InputWrapper,
  InputArea,
  InputControls,
  CancelButton,
  ConfirmButton
} from './Styles';

type Props = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  confirmCaption: string;
  handleConfirmClick: () => void;
  handleCancelClick: () => void;
};

export const PostInputView = ({
  inputValue,
  setInputValue,
  confirmCaption,
  handleConfirmClick,
  handleCancelClick
}: Props): JSX.Element => {
  return (
    <InputWrapper>
      <InputArea
        value={inputValue}
        onChange={(event: any) => setInputValue(event.target.value)}
        placeholder={TEXT.PLACEHOLDERS.ADD_COMMENT}
      />
      <InputControls>
        <Box mr={10}>
          <CancelButton onClick={handleCancelClick}>
            {TEXT.BUTTONS.CANCEL}
          </CancelButton>
        </Box>
        <ConfirmButton onClick={handleConfirmClick}>
          {confirmCaption}
        </ConfirmButton>
      </InputControls>
    </InputWrapper>
  );
};
