import React from 'react';

const UserInfo = ({name, entries}) => {
    return(
        <div>
            <div className='white f3'>
                <strong>{name}</strong>, your current entry count is
            </div>
            <div className='white f1'>
                {`#${entries}`}
            </div>
        </div>
    )
}

export default UserInfo;