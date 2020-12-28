import React from 'react';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import Button, { ButtonProps } from '@material-ui/core/Button';

import { MuiTooltipButtonProps } from '../types';

const MuiTooltipButton = ({
  title,
  placement,
  onClick,
  tooltipClassName = '',
  buttonClassName = '',
  color = 'primary',
  buttonText,
  variant = 'contained',
  startIcon,
}: MuiTooltipButtonProps) => {
  return (
    <Tooltip placement={placement} title={title} className={tooltipClassName}>
      <Button
        onClick={onClick}
        className={buttonClassName}
        color={color}
        startIcon={startIcon}
        variant={variant}
      >
        {buttonText}
      </Button>
    </Tooltip>
  );
};

export default MuiTooltipButton;
