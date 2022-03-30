import styled, { css } from 'styled-components';

import { ButtonMixin } from '../../common/ButtonMixin';

const TextMixin = css`
  font-family: Open Sans, Arial;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
`;

export const ProfileIcon = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 30px;
  background: url(${({ url }: { url: string }) => url});
`;

export const ProfileName = styled.div`
  ${TextMixin};
  font-size: 13px;
  font-weight: 700;
  color: #757575;
`;

export const DateTime = styled.div`
  ${TextMixin};
  font-size: 12px;
  font-weight: 400;
  color: #757575;
`;

export const PostContent = styled.div`
  ${TextMixin};
  font-size: 14px;
  font-weight: 400;
`;

export const ReplyButton = styled.button`
  padding: 0;
  ${ButtonMixin};
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  color: #138813;
`;

export const RepliesWrapper = styled.div`
  margin: 14px 0 0 20px;
  padding-left: 14px;
  border-left: 1px dashed #979797;
`;
