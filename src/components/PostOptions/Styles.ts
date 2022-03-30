import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';

import { ButtonMixin } from '../../common/ButtonMixin';

export const OptionsWrapper = styled.div`
  position: relative;
`;

export const OptionsButton = styled.button`
  height: 24px;
  padding: 2px 8px;
  ${ButtonMixin};
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  color: #898989;
`;

export const OptionsCollapsibleList = styled(Flex)`
  flex-direction: column;
  position: absolute;
  left: 8px;
  top: 20px;
  z-index: 1;
  border-left: 1px solid #eee;

  & button {
    padding: 4px 8px;
    ${ButtonMixin};
    font-size: 13px;
    font-weight: 400;
    text-align: left;

    &:hover {
      background: #eee;
    }
  }
`;
