import React, { useCallback, useState } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Task } from '../../context/ProfileCreationProgressContext/ProfileCreationProgressProvider';

type TaskProgressProps = {
	updateTask: (task: Task, value: boolean) => void;
	task: Task;
};
export const ItemWithCheckBox: React.FC<TaskProgressProps> = ({
	updateTask,
	task,
}) => {
	const { description, checked } = task;
	const [done, setDone] = useState(checked);
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.currentTarget.checked;
			setDone(value);
			updateTask(task, value);
		},
		[task, updateTask]
	);

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'row',
			}}
			height="100%"
			width="100vw"
		>
			<FormControlLabel
				value="top"
				control={
					<Checkbox checked={done} onChange={handleChange} size="small" />
				}
				label={description}
			/>
		</Box>
	);
};
