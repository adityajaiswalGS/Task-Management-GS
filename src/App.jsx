import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TaskCreatePage from './pages/TaskCreatePage';  // New
import TaskEditPage from './pages/TaskEditPage';  // New
import BookmarkedTasksPage from './pages/BookmarkedTasksPage';  // New
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './components/common/PrivateRoute';
import { useSelector } from 'react-redux';
import { getTheme } from '../theme';
import Navbar from './components/navbar/Navbar';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';


function App() {
  const themeMode = useSelector((state) => state.ui.themeMode);
  const theme = getTheme(themeMode);
  return (
    <SnackbarProvider maxSnack={3}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Navbar/>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/create"
            element={
              <PrivateRoute>
                <TaskCreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <PrivateRoute>
                <TaskEditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <PrivateRoute>
                <BookmarkedTasksPage />
              </PrivateRoute>
            }
          />
<Route path="*" element={<ErrorPage />} /></Routes>
      </Router>
    </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
/*

🔹 Core Features

Create new tasks

Edit existing tasks

Delete tasks

Mark tasks as completed or pending

View list of all tasks

Search Tags

Filter tasks by status (All / Completed / Pending)

Filter tasks by priority or due date

Sort tasks by date or priority

Paginate or “Load More” tasks large lists



🔹 Data & State

All Tasks must persist.

Full CRUD operations must work correctly (Create, Read, Update, Delete)

Global state management for Tasks and filters


🔹 Authentication

User login and logout

Fake JWT token handling

Protected routes (accessible only when logged in)

Store login session persistently



🔹 Navigation

Separate pages for:


      * each Tasks Details

      * Create Tasks

      * Login

Private routes for create/edit screens

Error page for invalid routes


🔹 UI & UX

Dark / light mode toggle

Snackbar or toast notifications for create/update/delete actions

Confirmation dialog before deleting a Tasks 

Loading indicator and empty state messages


🔹 Advanced Functionality

Option to categorize Tasks by tags

Bookmark section , and Can Bookmark Tasks               

Local caching or remember last filter state

Persist user preferences (theme, sorting)

🔹 Technical Requirements

Must include Redux for global state.

Must use Redux-Saga for async API operations.

Must following proper reduxz folder structure.

Must include routing with React Router

Must include Material UI components

Must include at least one error boundary

Must handle authentication and token persistence





here is the proper description -->  application name must be : Task Management GS , The landing page is Login Page 
where we are implementing jwt thing fake authentication  private route thing , after that Landing page looks like 
top having navbar with logout ( that will redirect to login page and jwt fake token will delete from local storage thing...) , light and dark mode toggle botton , and a temp fake user profile ( when click or hover a card of that opened and fake details )
below that there is left side filter option middle searchbar to seach tasks , right side Bookmared tasked( that open a page with tasks that are book marked ). After that at  Middle it at first only 5 task should be visible from store  , below more tasks loading thing you have to do
These tasks are clickable and when i click on certain task , that task dynamic routing page will open and that is out edit page also
like there are fields which are editable after changes below update button will enable and we can made changes to it or side there is delete button , that is for the edit page
in the main landing page below tasks are showing i want a add new task button that will redirect or navigate to page addnewtasks , in that task fields are Titles and subtitles , other things i have to store so that i can sort or filter it later are : date and time , priority(low/mid/high)
and in landing page there is a see all tasks button too , that opens a page that will  show all tasks that we added , and each task is accessiable like if we click weredirect to that task edit page , also delete button also there 


here is complete thing that i wanted so firstly we have to discuss the things how gonna do , like :

Planned overall project flow and structure.
Created outline of how different components and features will connect.
*/