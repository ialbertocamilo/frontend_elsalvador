'use client';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {CardBody} from '../../../../components/bootstrap/Card';
import React, {useRef} from 'react';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';
import {TransmittanceTable} from "../../../../components/tables/TransmittanceTable";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TransmittancePage = () => {
    const editor = useRef(null);
    return (
        <PageWrapper>
            <Page>
                <Card>
                    <CardBody>
                        <h4 className='fw-bold'>Cálculo de transmitancia térmica de muros</h4>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div className='row'>
                            <div className='flex-column col-md-2 col-sm-12 align-self-center'>
                                <span>Nombre de muro tipo 1</span>
                            </div>
                            <div className='col-md-6 col-sm-12'>
                                <Input placeholder='Ingresa el nombre del muro'></Input>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <div className='row align-content-between justify-content-between px-2'>
                    <Card className='col me-2'>
                        <CardBody>
                            <TransmittanceTable/>
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
                <div className="row">

                    <Card className='col me-2'>
                        <CardBody>
                            <Editor placeholder="Detalle muro tipo" ref={editor} />
                        </CardBody>
                    </Card>
                </div>
            </Page>
        </PageWrapper>
    );
};

export default TransmittancePage;
