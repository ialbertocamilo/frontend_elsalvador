import {Autosave} from "../extras/Autosave";
import Input from "../bootstrap/forms/Input";
import FormGroup from "../bootstrap/forms/FormGroup";
import Button from "../bootstrap/Button";
import React, {useState} from "react";
import Select from "../bootstrap/forms/Select";


const Row = ({data, onInputChange}) => {
    const windowOrientation = [
        {value: 0, text: "Norte"},
        {value: 1, text: "Noreste"},
        {value: 2, text: "Este"},
        {value: 3, text: "Sureste"},
        {value: 4, text: "Sur"},
        {value: 5, text: "Suroeste"},
        {value: 6, text: "Oeste"},
        {value: 7, text: "Noroeste"},
    ]

    const shadowType=[
        {value:0,text:"Horizontal"},
        {value:1,text:"Vertical"},
        {value:1,text:"Combinada"},
    ]
    return (
        <tr>
            <td className='col-2 p-2'>
                <Select ariaLabel={"Seleccionar"} list={windowOrientation}/>
            </td>
            <td className='col-2 p-2'>
                <Select ariaLabel={"Seleccionar"} list={shadowType}/>
            </td>
            <td className='p-2'>
                <Input type='text' className='col'
                       value={data.column3}
                       onChange={(e: any) => onInputChange('column3', e.target.value)}
                />
            </td>
            <td className='p-2'>
                <Input type='text' className='col'
                       value={data.column4}
                       onChange={(e: any) => onInputChange('column4', e.target.value)}/>

            </td>
            <td className='p-2'>
                <Input type='text' className='col'
                       value={data.column5}
                       onChange={(e: any) => onInputChange('column5', e.target.value)}/>

            </td>
            <td className='p-2'>
                <Input type='text' className='col'
                       value={data.column5}
                       onChange={(e: any) => onInputChange('column5', e.target.value)}/>

            </td>
            <td className='text-center'>x</td>
            <td className='text-center'>x</td>
            <td className='text-center'>x</td>
            <td className='p-2'>
                <FormGroup id='width-window'>
                    <div className='d-flex align-content-between'>
                        <Button color='storybook'>-</Button>
                    </div>
                </FormGroup>
            </td>
        </tr>
    );
};
export const ShadingTable = () => {
    const [row, setRow] = useState([{column1: '', column2: '', column3: '', column4: '', column5: ''}]);
    const handleInputChange = (index: string | number, column: string | number, val: any) => {
        const newRows = [...row];
        // @ts-ignore
        newRows[index][column] = val;
        setRow(newRows);
    };

    function addRow() {
        setRow([...row, {column1: '', column2: '', column3: '', column4: '', column5: ''}]);
    }

    return (
        <>

            <div className='m-2 my-4'>
                <Button color='primary' onClick={addRow}>
                    Agregar fila
                </Button>
            </div>
            <table>
                <thead>
                <tr className='text-center'>
                    <th className='px-2'>Orientación ventana</th>
                    <th className='px-2'>Tipo sombra</th>
                    <th className='px-2'>Altura de la ventana(m)</th>
                    <th className='px-2'>Anchura de la ventana(m)</th>
                    <th className='px-2'>Profundidad del alero horizontal(m)</th>
                    <th className='px-2'>Profundidad del alero vertical(m)</th>
                    <th className='px-5'>Horizontal</th>
                    <th className='px-5'>Vertical</th>
                    <th className='px-5'>Combinada</th>
                </tr>
                </thead>
                <tbody>
                {row.map((value, index) => (
                    <Row key={index} data={value} onInputChange={(column: string | number, val: any) =>
                        handleInputChange(index, column, val)
                    }></Row>
                ))}
                </tbody>
            </table>
        </>
    );
}