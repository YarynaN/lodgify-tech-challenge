import React from 'react';
import { Box, Typography } from '@mui/material';

const PageInProgress: React.FC = () => (
	<Box
		margin={4}
		display="flex"
		flexDirection="column"
		justifyContent="canter"
		alignItems="center"
	>
		<Typography variant="h4" marginBottom={2}>
			We are in progress yet. Please, be patient and wait for our updates.
		</Typography>
		<Box
			component="img"
			sx={{
				height: 450,
				width: 450,
				maxHeight: { xs: 233, md: 450 },
				maxWidth: { xs: 350, md: 450 },
				objectFit: 'cover',
			}}
			alt="we are in progress"
			src="https://i.pinimg.com/originals/97/e9/42/97e942ce7fc4e9d4ea6d844a382f251f.gif"
		/>
	</Box>
);

export default PageInProgress;
