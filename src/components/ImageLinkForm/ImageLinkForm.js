import React from 'react';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This smart chip will detect faces in your picture'}
            </p>
            <div>
                <input onChange={onInputChange} className='f4 pa2 w-50' type='text' placeholder='copy here your link' />
                <button onClick={onPictureSubmit} className='w-10 grow f4 link ph3 pv2 dib black bg-lightest-blue'>{'Detect'}</button>
            </div>
            
        </div>
        
    )
}

export default ImageLinkForm;