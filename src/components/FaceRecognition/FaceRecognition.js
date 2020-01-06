import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl,boxes}) => {
    const boundingBoxes = boxes.map((box,i) => {
        return(
            <div
                key={i}
                className='bounding-box' 
                style={{
                    top: box.topRow, 
                    left: box.leftCol ,
                    bottom: box.bottomRow ,
                    right: box.rightCol 
                }}>
            </div>
        )
    })


    return <div className="center ma">
        <div className="absolute mt2">
            <img id='inputImage' src={imageUrl} alt="" width="500px" height="auto"/>
            {boundingBoxes}
        </div>
        
        </div>
}

export default FaceRecognition;
