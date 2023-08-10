import React, { useEffect } from 'react';
import {
	Box,
	Card,
	CardContent,
	CircularProgress,
	Typography,
	useTheme,
} from '@mui/material';
import { useProgressContext } from '../../context';
import { ExpandableList, LinearProgress } from '../../components';

const TaskProgressWidget = () => {
	const {
		fetchGroupedTasks,
		items,
		isLoading,
		progress,
		calculateProgress,
		updateTask,
		isGroupDone,
	} = useProgressContext();
	const theme = useTheme();

	useEffect(() => {
		void fetchGroupedTasks();
	}, []);

	useEffect(() => {
		if (items) {
			calculateProgress();
		}
	}, [items]);

	if (isLoading) {
		return <CircularProgress />;
	}

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#f9f9f9',
			}}
			height="100vh"
			width="100vw"
		>
			<Card sx={{ maxWidth: '800px', paddingTop: 2, borderRadius: 2 }}>
				<CardContent>
					<Typography variant="h1" fontSize="large" fontWeight="bold" m={2}>
						Lodgify grouped task
					</Typography>
					<LinearProgress completed={progress} />
					<Box
						sx={{
							mt: 4,
							borderRadius: 2,
							border: `1px solid ${theme.palette.divider}`,
							maxHeight: '400px',
							overflowY: 'auto',
							overflowX: 'hidden',
						}}
					>
						{items.length > 0 &&
							items.map((item, index) => (
								<ExpandableList
									group={item}
									isGroupDone={isGroupDone}
									updateTask={updateTask}
									key={`${item.name}-${index}`}
								/>
							))}
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default TaskProgressWidget;
