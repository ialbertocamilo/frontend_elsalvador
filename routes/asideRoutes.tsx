import DefaultAside from '../pages/_layout/_asides/DefaultAside';
import { demoPagesMenu } from '../pages/menu';

const asides = [
	{ path: demoPagesMenu.login.path, element: null, exact: true },
	{ path: demoPagesMenu.signUp.path, element: null, exact: true },
	{ path: '/*', element: <DefaultAside />, exact: true },
];

export default asides;
