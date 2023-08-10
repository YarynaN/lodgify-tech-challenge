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
			<AccordionSummary
				expandIcon={<LiaAngleDownSolid />}
				sx={{ py: 1, px: 2, border: 'none' }}
			>
				<Box
					display="flex"
					width="100%"
					flexDirection="row"
					alignItems="center"
				>
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
						color={markDone ? 'primary.main' : 'grey'}
					>
						{name}
					</Typography>
					<Typography
						sx={{
							color: 'text.secondary',
							justifySelf: 'flex-end',
							marginRight: '12px',
						}}
						fontSize="medium"
					>
						{expanded ? 'Hide' : 'Show'}
					</Typography>
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						ml: 2,
						mt: 2,
					}}
				>
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
