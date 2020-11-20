import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import DashBoard from './layouts/DashBoard';
import Login from './layouts/Login';
import StudentDashBoard from './layouts/StudentDashBoard';
import TeacherDashBoard from './layouts/TeacherDashBoard';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/StudentDashBoard">
              <StudentDashBoard />
            </Route>
            <Route path="/TeacherDashBoard">
              <TeacherDashBoard />
            </Route>
            <Route path="/">
              <Login />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
