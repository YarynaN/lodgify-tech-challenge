export type Task = {
	description: string;
	value: number;
	checked: boolean;
};

export type Group = {
	name: string;
	tasks: Task[];
};
