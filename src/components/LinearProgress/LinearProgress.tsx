import React from 'react';
import { Box, Typography } from '@mui/material';

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
		<Box
			sx={{
				height: '20px',
				borderRadius: 4,
				m: 2,
				backgroundColor: '#f3fbfa',
				display: 'flex',
			}}
		>
			<Box
				data-testid={'progressBar'}
				sx={{
					height: '100%',
					width: `${completed}%`,
					borderRadius: 'inherit',
					textAlign: 'right',
					backgroundColor: 'primary.main',
				}}
			>
				{completed > PERCENT_DISPLAY_THRESHOLD &&
					createPercentageLabel('secondary.main')}
			</Box>
			{completed <= PERCENT_DISPLAY_THRESHOLD &&
				createPercentageLabel('primary.main')}
		</Box>
	);
};
