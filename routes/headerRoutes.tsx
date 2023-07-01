import React from 'react';
import DefaultHeader from '../pages/_layout/_headers/DefaultHeader';
import { pageLayoutTypesPagesMenu } from '../menu';

const headers = [
	{ path: pageLayoutTypesPagesMenu.pageLayout.subMenu.headerAndSubheader.path, element: null },

	{
		path: `/*`,
		element: <DefaultHeader />,
	},
];

export default headers;
