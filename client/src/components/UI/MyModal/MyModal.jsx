import React from 'react';
import cl from './MyModal.module.css'
const MyModal = ({children, visible, setvisible}) => {
    const rootClasses = [cl.myModal]
    if (visible){
        rootClasses.push(cl.active)
    }
    return (
        <div className={rootClasses.join(" ")} onClick={() => setvisible(false)}>
            <div className={cl.myModalContent} onClick={(e)=> e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;