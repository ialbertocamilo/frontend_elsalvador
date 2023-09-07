'use client';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../../layout/Page/Page';
import Card, {CardBody} from '../../../../../components/bootstrap/Card';
import React, {useState} from 'react';
import Button from '../../../../../components/bootstrap/Button';
import {ProportionTable} from '../../../../../components/tables/ProportionTable';
import {ButtonTypes, SaveProjectButton} from "../../../../../components/buttons/SaveProjectButton";
import {useParams} from "next/navigation";

const ProportionPage = () => {

    const keyName='proportion'
    const params = useParams()
    const [data, setData] = useState({})
    return (
        <PageWrapper>
            <Page>
                <Card>
                    <CardBody>
                        <h4 className='fw-bold'>Proporción muro ventana</h4>
                        <span>
							Ingresar Información requerida en las celdas indicadas. Considerar que
							la información introducida es responsabilidad de quien la reporta y será
							verificada por la entidad correspondiente.
						</span>
                    </CardBody>
                </Card>
                <div className='row align-content-between justify-content-between px-2'>
                    <Card className='col me-2'>
                        <CardBody>
                            <ProportionTable onData={(e:any) => {
                                setData(e);
                            }} keyName={keyName} />
                        </CardBody>
                    </Card>
                    <Card className='col-md-3'>
                        <CardBody>
                            <h4>Documentación entregada</h4>
                            <span>Planos de Fachada con dimensiones de ventanas y generales</span>
                            <div className='align-items-center text-center mt-2'>
                                <Button
                                    color='info'
                                    isLight
                                    tag='a'
                                    to='/somefile.txt'
                                    target='_blank'
                                    icon='AttachFile'
                                    download>
                                    Adjuntar
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <SaveProjectButton payload={{project_id: params?.projectId || '', payload: data, key: keyName}}
                                   type={ButtonTypes.projectData}/>
            </Page>
        </PageWrapper>
    );
};

export default ProportionPage;
