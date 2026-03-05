import React from 'react'
import AddGroup from '../AddGroup/AddGroup'
import GroupLogo from '../GroupLogo/GroupLogo';
import AddButton from '../AddButton/AddButton';

const Navigation: React.FC = () => {
    const groups = ['Tenis', 'Bieganie', 'Czytanie'];
    return (
        <>
            <div className='fixed top-0 h-[30px] bg-slate-500 w-[100vw]'><h2 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>Label</h2></div>
            <div className='bg-slate-400 h-[100vh] w-[90px] flex flex-col mt-[30px] fixed p-[10px]'>
                {groups ?
                    groups.map((name: any) => {
                        return <GroupLogo name={name} key={name} />
                    })
                    :
                    ''}
                <AddGroup />
            </div>
        </>
    )
}

export default Navigation