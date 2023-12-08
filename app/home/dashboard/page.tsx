'use client';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { BuildingsChart } from '../../../components/dashboard/BuildingsChart';
import { BuildingsPerUser } from '../../../components/dashboard/BuildingsPerUser';
import { DesignCompliances } from '../../../components/dashboard/DesignCompliances';

const DashboardPage = () => {
	return (
		<PageWrapper>
			<Page>
				<div className='row'>
					<div className='col-7'>
						<BuildingsChart title={'Reporte de parámetros de edificación'} />
					</div>
					<div className='col-5'>
						<BuildingsPerUser />
					</div>
					<div className='col-7'>
						<BuildingsChart
							title={'Reporte de edificaciones registradas en el sistema'}
						/>
					</div>
					<div className='col-5'>
						<DesignCompliances title={'Cumplimientos de diseño'} />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
