import React from 'react';
import { Box, Typography } from '@mui/material';
import { baseLine, progressBar } from './styles';

type LinearProgressProps = {
	completed: number;
};

const PERCENT_DISPLAY_THRESHOLD = 6;
export const LinearProgress: React.FC<LinearProgressProps> = ({
	completed,
}) => {
	const createPercentageLabel = (color: string) => (
		<Typography
			variant="body2"
			color={color}
			marginRight={2}
			marginLeft={2}
			fontWeight="500"
		>
			{`${completed}%`}
		</Typography>
	);

	return (
		<Box sx={baseLine}>
			<Box
				data-testid={'progressBar'}
				sx={{ ...progressBar, width: `${completed}%` }}
			>
				{completed > PERCENT_DISPLAY_THRESHOLD &&
					createPercentageLabel('secondary.main')}
			</Box>
			{completed <= PERCENT_DISPLAY_THRESHOLD &&
				createPercentageLabel('primary.main')}
		</Box>
	);
};
