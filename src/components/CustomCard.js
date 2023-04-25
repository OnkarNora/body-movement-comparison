import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;



function CustomCard({ img, title, description, setModalVideo, setModalPoints, vid, impPoints }) {

    const navigate = useNavigate();
    
    const onClickCard = () => {
        setModalVideo(vid);
        setModalPoints(impPoints);
        navigate('/process/video');
    }

    return (
        <Card
            hoverable
            cover={<img alt="example" src={img} style={{width: 240,height: 240}} />}
            onClick={onClickCard}
            className='each-card'
        >
            <Meta title={title} description={description} />
        </Card>
    )
}

export default CustomCard