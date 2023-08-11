import React, { useCallback, useMemo, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Typography,
	useTheme,
} from '@mui/material';
import { ItemWithCheckBox } from '../ItemWithCheckbox/ItemWithCheckBox';
import {
	LiaClipboardListSolid,
	LiaClipboardCheckSolid,
	LiaAngleDownSolid,
} from 'react-icons/lia';
import { Group, Task } from '../../models/CreateProfile/GroupedTasks';
import { accordionBorder, label, summaryWrapper, taskWrapper } from './styles';

type AccordionProps = {
	group: Group;
	isGroupDone: (group: Group) => boolean;
	updateTask: (task: Task, checked: boolean) => void;
};

export const ExpandableList: React.FC<AccordionProps> = ({
	group,
	updateTask,
	isGroupDone,
}) => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const theme = useTheme();
	const { name, tasks } = group;
	const markDone = useMemo(() => isGroupDone(group), [isGroupDone, name]);

	const handleChange = useCallback(() => {
		setExpanded((prevState) => !prevState);
	}, []);

	return (
		<Accordion
			onChange={handleChange}
			disableGutters
			elevation={0}
			sx={{ backgroundColor: 'unset' }}
		>
			<AccordionSummary expandIcon={<LiaAngleDownSolid />} sx={accordionBorder}>
				<Box sx={summaryWrapper}>
					{markDone ? (
						<LiaClipboardCheckSolid
							size={'20px'}
							color={theme.palette.primary.main}
						/>
					) : (
						<LiaClipboardListSolid size={'20px'} />
					)}
					<Typography
						sx={{ flex: 1, marginLeft: 2 }}
						color={markDone ? 'primary.main' : 'text.primary'}
					>
						{name}
					</Typography>
					<Typography sx={label} fontSize="medium">
						{expanded ? 'Hide' : 'Show'}
					</Typography>
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={taskWrapper}>
					{tasks.map((task, idx) => (
						<ItemWithCheckBox
							key={`${name}-${idx}`}
							task={task}
							updateTask={updateTask}
						/>
					))}
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};
