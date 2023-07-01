// generate code sample for tsx

import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CommonDashboardBookingLists from '../../src/pages/_common/BookingComponents/CommonDashboardBookingLists';
import { useSession } from 'next-auth/react';

const LocationPage = () => {
	const session = useSession();

	const router = useRouter();
	useEffect(() => {
		console.log(session.data?.user?.name);
		console.log(session.data?.user);
	}, [session]);
	return (
		<PageWrapper>
			<Page>
				<CommonDashboardBookingLists />
			</Page>
		</PageWrapper>
	);
};

export default LocationPage;
