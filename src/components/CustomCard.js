import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
function CustomCard({ img, title, description }) {
    return (
        <Link to="/process/video" className='links'>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={img} />}
            >
                <Meta title={title} description={description} />
            </Card>
        </Link>
    )
}

export default CustomCard