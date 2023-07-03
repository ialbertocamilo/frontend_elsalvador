import React from 'react';

const LoginLayout = ({ children }: { children: React.ReactElement }) => {
	return (
		<>
			<section>{children}</section>
		</>
	);
};

export default LoginLayout;
