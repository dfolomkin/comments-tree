import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';

import { ButtonMixin } from '../../common/ButtonMixin';

export const InputWrapper = styled(Flex)`
  position: relative;
`;

export const InputArea = styled.textarea.attrs({
  maxLength: '512'
})`
  height: 134px;
  width: 100%;
  padding: 11px 15px;
  border: 1px solid #e5e5e5;
  resize: none;
`;

export const InputControls = styled(Flex)`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 42px;
  width: 500px;
  justify-content: flex-end;
  padding: 0 12px;
`;

export const CancelButton = styled.button`
  height: 32px;
  padding: 6px 14px;
  ${ButtonMixin};
  font-size: 14px;
  text-align: center;
  color: #898989;
`;

export const ConfirmButton = styled.button`
  height: 32px;
  padding: 6px 14px;
  ${ButtonMixin};
  background: #36ac3a;
  font-size: 14px;
  text-align: center;
  color: #fff;
`;
