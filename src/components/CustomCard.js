import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;



function CustomCard({ img, title, description, setModalVideo, vid }) {

    const navigate = useNavigate();
    
    const onClickCard = () => {
        setModalVideo(vid);
        navigate('/process/video');
    }

    return (
        <Card
            hoverable
            style={{ width: 240}}
            cover={<img alt="example" src={img} style={{width: 240,height: 240}} />}
            onClick={onClickCard}
        >
            <Meta title={title} description={description} />
        </Card>
    )
}

export default CustomCard