import { TooltipProps } from '@material-ui/core/Tooltip';
import { ButtonProps } from '@material-ui/core/Button';
import { ChipProps } from '@material-ui/core/Chip';

export interface MuiTooltipButtonProps {
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

export interface MuiTagChipsPropTypes {
  tags: string[];
  onDelete?: ChipProps['onDelete'];
}

export interface TagsDataTypes {
  tag: string;
  key: number;
}
