import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
	ProfileCreationProgressContextProvider,
	ProgressContextObject,
} from './context';
import TaskProgressWidget from './pages/TaskProgressWidget/TaskProgressWidget';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import PageInProgress from './pages/PageInProgress/PageInProgress';

const theme = createTheme({
	palette: {
		primary: {
			main: '#51b498',
		},
		secondary: {
			main: '#ffffff',
		},
	},
});

function App() {
	return (
		<>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<ProfileCreationProgressContextProvider context={ProgressContextObject}>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<TaskProgressWidget />} />
							<Route path="*" element={<PageInProgress />} />
						</Routes>
					</BrowserRouter>
				</ProfileCreationProgressContextProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
