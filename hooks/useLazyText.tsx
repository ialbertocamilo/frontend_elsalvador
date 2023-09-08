import React, {useEffect, useState} from "react";
import showNotification from "../components/extras/showNotification";
import Icon from "../components/icon/Icon";


export const useLazyText=(textPrincipal:string)=>{

    const [text, setText] = useState(textPrincipal)
    const [lazyText, setLazyText] = useState(textPrincipal)
    const [timeRetarded, setTimeRetarded] = useState<NodeJS.Timeout | null>(null);

    const [time, setTime] = useState(500)
    useEffect(() => {
        lazy(text)
    }, [text]);
    function lazy(text:string){
        if (timeRetarded)
            clearTimeout(timeRetarded)
        const nuevoTimeout = setTimeout(() => {
            setLazyText(text)
        }, time);

        setTimeRetarded(nuevoTimeout)
    }
    return {
        lazyText,
        setLazyText,
        text,
        setText,
        setTime
    }
}