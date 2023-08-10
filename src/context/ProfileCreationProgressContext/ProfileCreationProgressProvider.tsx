import React, {
	createContext,
	HTMLAttributes,
	useContext,
	useState,
} from 'react';
import { fetchGroupsRequest } from './requests';
import { getCurrentProgress } from '../utils/utils';

export type Task = {
	description: string;
	value: number;
	checked: boolean;
};

export type Group = {
	name: string;
	tasks: Task[];
};

export type TasksContextType = {
	items: Group[];
	isLoading: boolean;
	fetchGroupedTasks: () => Promise<void>;
	isGroupDone: (group: Group) => boolean;
	updateTask: (task: Task, checked: boolean) => void;
	calculateProgress: () => void;
	progress: number;
};

type ProgressContextProps = {
	context: React.Context<TasksContextType>;
} & HTMLAttributes<HTMLDivElement>;

export const defaultContext: TasksContextType = {
	items: [],
	isLoading: false,
	isGroupDone: () => false,
	updateTask: () => undefined,
	calculateProgress: () => undefined,
	progress: 0,
	fetchGroupedTasks: async () => {},
};

function CreateGroupedTasksContext() {
	return createContext<TasksContextType>(defaultContext);
}

const ProfileCreationProgressContextProvider: React.FC<
	ProgressContextProps
> = ({ children, context }) => {
	const [items, setItems] = useState<Group[]>([]);
	const [progress, setProgress] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchGroupedTasks = async () => {
		setIsLoading(true);
		try {
			const result = await fetchGroupsRequest();
			const tasks = (await result.json()) as Group[];
			setIsLoading(false);
			setItems(tasks);
		} catch (e: unknown) {
			const { message } = e as Error;
			setIsLoading(false);
			// eslint-disable-next-line no-console
			console.log(message);
		}
	};

	const calculateProgress = () => {
		const currentProgress = Math.floor(getCurrentProgress(items));
		setProgress(currentProgress);
	};

	const isTaskGroupDone = (group: Group) =>
		group.tasks.every((task) => task.checked);

	const updateTask = (task: Task, checked: boolean) => {
		task.checked = checked;
		calculateProgress();
	};

	const contextValue: TasksContextType = {
		items,
		isLoading,
		isGroupDone: isTaskGroupDone,
		updateTask,
		progress,
		calculateProgress,
		fetchGroupedTasks,
	};

	return <context.Provider value={contextValue}>{children}</context.Provider>;
};

const ProgressContextObject = CreateGroupedTasksContext();
const useProgressContext = () => useContext(ProgressContextObject);

export {
	ProfileCreationProgressContextProvider,
	ProgressContextObject,
	useProgressContext,
};
