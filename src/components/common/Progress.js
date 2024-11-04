import React, { useState, useRef, useEffect } from 'react';

const Progress = ({initProgress, onUpdate, readOnly}) => {
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const lineRef = useRef(null);

    useEffect(() => {
        setProgress(initProgress);
    }, [initProgress]);

    const handleMouseMove = (event) => {
        if (readOnly) return;
        if (!isDragging) return;

        const rect = lineRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const newProgress = Math.round((x / rect.width) * 100);

        if (newProgress >= 0 && newProgress <= 100) {
            setProgress(newProgress);
        }
    };

    const handleMouseUp = () => {
        if (readOnly) return;
        setIsDragging(false);
    };

    const handleMouseDown = () => {
        if (readOnly) return;
        setIsDragging(true);
    };

    const handleTouchMove = (event) => {
        if (readOnly) return;
        if (!isDragging) return;
        
        const rect = lineRef.current.getBoundingClientRect();
        const x = event.touches[0].clientX - rect.left;
        const newProgress = Math.round((x / rect.width) * 100);

        if (newProgress >= 0 && newProgress <= 100) {
            setProgress(newProgress);
        }
    };

    const handleTouchEnd = () => {
        if (readOnly) return;
        setIsDragging(false);
    };

    const handleCircleMouseUp = () => {
        if (readOnly) return;
        onUpdate(progress);
    };

    return (
        <>
            {!readOnly && <label className="form-label">Progress ({progress}%)</label>}
            <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%', 
                    height: '30px' 
                }}
            >
                <div style={{ width: '30px', textAlign: 'center' }}>0</div>
                <div 
                    style={{ 
                        position: 'relative', 
                        flexGrow: 1, 
                        height: '30px', 
                        margin: '0 10px' 
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div style={{
                            height: '4px',
                            background: '#ddd',
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            right: 0
                        }} />
                    <div
                        ref={lineRef}
                        style={{
                            width: '100%',
                            height: '4px',
                            background: '#ddd',
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            left: `${progress}%`,
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '20px',
                            height: '20px',
                            background: '#183758',
                            borderRadius: '50%',
                            cursor: 'pointer'
                        }}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleMouseDown}
                        onMouseUp={handleCircleMouseUp}
                    />
                </div>
                <div style={{ width: '30px', textAlign: 'center' }}>100</div>
            </div>
        </>
    );
};

export default Progress;
