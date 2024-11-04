import { useEffect, useState } from 'react';
import blankStar from '../../assets/star_blank_64.png';
import yellowStar from '../../assets/star_yellow_64.png';


const Rate = ({initRate, onUpdate}) => {
    const [rate, setRate] = useState(0);
    const [hovered, setHovered] = useState(0);

    const handleMouseEnter = (index) => setHovered(index);
    const handleMouseLeave = () => setHovered(0);

    useEffect(() => {
        setRate(initRate);
    }, [initRate]);

    const handleClick = (value) => {
        setRate(value)
        onUpdate(value)
    }

    const elements = [];
    for (let i = 1; i <= 5; i++) {
        elements.push(
            <img
                key={i}
                style={{ width: '32px', marginRight: '5px', cursor: 'pointer' }}
                src={i <= (hovered || rate) ? yellowStar : blankStar}
                onClick={() => handleClick(i)}
                onMouseEnter={() => handleMouseEnter(i)}
            />
        );
    }

    return (
        <div onMouseLeave={handleMouseLeave} style={{ display: 'flex', gap: '5px' }}>
            {elements}
        </div>
    );
}

export default Rate;