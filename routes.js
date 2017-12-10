import PlacePage from './pages/PlacePage.js';
import HomePage from './pages/HomePage.js';
import NotePage from './pages/NotePage.js';

const routes = [
    { path: '/', component: HomePage },
    { path: '/places', component: PlacePage },
    { path: '/notes', component: NotePage },
    // { name: 'note', path: '/note/id/:noteId', component: NotePage },
];

export default routes;