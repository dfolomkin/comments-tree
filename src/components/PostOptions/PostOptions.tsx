import { useState } from 'react';

import {
  OptionsWrapper,
  OptionsButton,
  OptionsCollapsibleList
} from './Styles';

type Props = {
  handlers: {
    caption: string;
    handler: () => void;
  }[];
};

export const PostOptions = ({ handlers }: Props): JSX.Element => {
  const [isCollapsed, setCollapsed] = useState(true);

  const handleOptionsClick = () => {
    setCollapsed(!isCollapsed);
  };

  const handleItemClick = (handler: () => void) => () => {
    handleOptionsClick();
    handler();
  };

  return (
    <OptionsWrapper>
      <OptionsButton onClick={handleOptionsClick}>. . .</OptionsButton>
      {!isCollapsed && (
        <OptionsCollapsibleList>
          {handlers.map(({ caption, handler }) => (
            <button onClick={handleItemClick(handler)}>{caption}</button>
          ))}
        </OptionsCollapsibleList>
      )}
    </OptionsWrapper>
  );
};
