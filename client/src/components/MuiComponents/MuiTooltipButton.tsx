import React from 'react';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface MuiTooltipButtonProps {
  title: TooltipProps['title'];
  placement: TooltipProps['placement'];
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tooltipClassName?: string;
  buttonClassName?: string;
  color?: ButtonProps['color'];
  buttonText: string;
  startIcon?: ButtonProps['startIcon'];
  variant?: ButtonProps['variant'];
}

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
