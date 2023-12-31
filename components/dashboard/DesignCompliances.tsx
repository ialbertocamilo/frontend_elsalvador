import Card, {CardBody, CardHeader, CardLabel, CardTitle} from '../bootstrap/Card';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import useDarkMode from '../../hooks/useDarkMode';
import {useCallback, useEffect, useState} from 'react';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import Select from '../bootstrap/forms/Select';
import {exportExcel, getLastFiveYearsFormatted} from '../../helpers/helpers';
import dayjs from 'dayjs';
import Button from '../bootstrap/Button';
import showNotification from '../extras/showNotification';

export const Box = ({
                        title, color, data,
                    }: {
    title: string; color: string; data?: { households: number; offices: number; tertiary: number; total: number };
}) => {
    const {darkModeStatus} = useDarkMode();
    return (<Card
            className={classNames('transition-base rounded-2 text-dark', color, {
                'bg-l10-primary-hover': !darkModeStatus, 'bg-lo25-primary-hover': darkModeStatus,
            })}
            shadow='sm'>
            <CardHeader className='bg-transparent'>
                <CardLabel>
                    <CardTitle tag='div' className='h5'>
                        {title}
                    </CardTitle>
                </CardLabel>
            </CardHeader>
            <CardBody>
                <div className='d-flex align-items-center pb-3'>
                    <div className='flex-shrink-0'>
                        <Icon
                            icon={title == 'Rechazados' ? 'Delete' : 'Check'}
                            size='4x'
                            color={title == 'Rechazados' ? 'danger' : 'primary'}
                        />
                    </div>
                    <div className='flex-grow-1 ms-3'>
                        <div className='fw-bold fs-3 mb-0 text-center'>{data?.households}</div>
                        Viviendas
                    </div>
                    <div className='flex-grow-1 ms-3'>
                        <div className='fw-bold fs-3 mb-0 text-center'>{data?.offices}</div>
                        Oficinas
                    </div>
                    <div className='flex-grow-1 ms-3'>
                        <div className='fw-bold fs-3 mb-0 text-center'>{data?.tertiary}</div>
                        Terciarios
                    </div>
                    <div className='flex-grow-1 ms-3'>
                        <div className='fw-bold fs-3 mb-0 text-center'>{data?.total}</div>
                        <span className={'h3'}>Total</span>
                    </div>
                </div>
            </CardBody>
        </Card>);
};
export const DesignCompliances = ({title}: { title: string }) => {
    const [approved, setApproved] = useState<{
        households: number; offices: number; tertiary: number; total: number;
    }>();
    const [denied, setDenied] = useState<{
        households: number; offices: number; tertiary: number; total: number;
    }>();
    const [year, setYear] = useState(Number(dayjs().format('YYYY')));
    const [selectYear, setSelectYear] = useState(year);
    useEffect(() => {
        DashboardService.getDesignCompliancesReport(selectYear).then((data) => {
            setApproved(data.approved);
            setDenied(data.denied);
        });
    }, [selectYear]);

    const doReport = useCallback(async () => {
        const report = await DashboardService.getDesignCompliancesReportExcel(selectYear);

        let date = dayjs().unix();
        if (!exportExcel(report, `Cumplimientos de diseño ${date} .xlsx`, 'REPORTE DE CUMPLIMIENTOS DE DISEÑO',)) showNotification(
            <span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1'/>
					<span>Error en reporte</span>
				</span>, 'No se puede descargar el siguiente reporte debido a que no existen datos.', 'danger',);
    }, [selectYear]);
    return (<Card stretch>
            <CardHeader>
                <CardLabel icon='SpaceDashboard' iconColor='secondary'>
                    <CardTitle tag='div' className='h5'>
                        {title}
                    </CardTitle>
                </CardLabel>
            </CardHeader>
            <CardBody>
                <Select
                    ariaLabel={'select year'}
                    value={selectYear.toString()}
                    list={getLastFiveYearsFormatted()}
                    onChange={(e: any) => setSelectYear(e.target.value)}
                />
                <br/>
                <div className='row g-1'>
                    <Box title={'Aprobados'} color={'bg-l25-primary'} data={approved}/>
                    <Box title={'Rechazados'} color={'bg-l25-secondary'} data={denied}/>
                </div>
            </CardBody>
            <CardHeader>
                <Button onClick={doReport} color='primary'>
                    Descargar reporte
                </Button>
            </CardHeader>
        </Card>);
};
