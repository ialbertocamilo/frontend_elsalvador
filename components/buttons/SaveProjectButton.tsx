import Button from "../bootstrap/Button";
import React, {useState} from "react";
import {IProjectDataSavingRequest} from "../../common/types/project.types";
import {useProjects} from "../../services/project/project.service";


export enum ButtonTypes {
    projectData,
    projectInfo,

}

interface SaveButtonProps {
    type: ButtonTypes;
    payload: IProjectDataSavingRequest
}

export const SaveProjectButton = ({type, payload}: SaveButtonProps) => {

    const projects = useProjects()
    const [active, setActive] = useState(false)

    async function doClick() {
        console.log("do click")
        setActive(true)

        if (type == ButtonTypes.projectData) {
            const result = await projects.saveProjectData(payload)
          setActive(false)
        }
    }

    return <Button
        color='info'
        isLight
        className='col-4'
        icon='Save'
        onClick={()=> {
            console.log("do click")
            doClick()
        }}
        isDisable={active}
    >
        Guardar
    </Button>
}