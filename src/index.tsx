import ReactDOM from 'react-dom/client';
import App from './App/App';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProjectItems from './components/Project/ProjectItems/ProjectItems';

import './styles/reset.scss';
import './index.module.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: 'project/:flag',
    element: <ProjectItems/>
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
);
