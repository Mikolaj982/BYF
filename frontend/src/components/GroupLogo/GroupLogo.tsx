import React from 'react'

type GroupLogo = {
    name: string,
}

const GroupLogo: React.FC<GroupLogo> = ({ name }) => {
    return (
        <div>Grupa {name}</div>
    )
}

export default GroupLogo