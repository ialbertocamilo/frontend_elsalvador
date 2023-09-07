import {Editor} from "react-draft-wysiwyg";
import React, {useRef, useState} from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface CustomEditorProps{
    placeholder?:string;
}
export const CustomEditor=({placeholder}:CustomEditorProps)=>{

    const editor = useRef(null)
    return <Editor placeholder={placeholder}  ref={editor} />
}