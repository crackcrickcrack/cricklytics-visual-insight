import React, { useState } from 'react';

interface CricketImageProps {
src: string;
alt: string;
fallbackSrc?: string;
className?: string;
loading?: 'lazy' | 'eager';
}

// Default fallback images from ESPNCricinfo
const defaultFallbacks = [
'https://img1.hscicdn.com/image/upload/f_auto,t_gn_w_1200/lsci/db/PICTURES/CMS/342100/342180.jpg',
'https://img1.hscicdn.com/image/upload/f_auto,t_gn_w_1200/lsci/db/PICTURES/CMS/342100/342178.jpg',
'https://img1.hscicdn.com/image/upload/f_auto,t_gn_w_1200/lsci/db/PICTURES/CMS/342100/342179.jpg'
];

const CricketImage: React.FC<CricketImageProps> = ({ 
src, 
alt, 
fallbackSrc, 
className = '', 
loading = 'lazy' 
}) => {
const [imgSrc, setImgSrc] = useState(src);
const [errorCount, setErrorCount] = useState(0);

const handleError = () => {
// If a specific fallback is provided, use it
if (fallbackSrc && imgSrc !== fallbackSrc) {
setImgSrc(fallbackSrc);
return;
}

// Otherwise use one of our default fallbacks
// Use a different fallback each time to avoid infinite loops
if (errorCount < defaultFallbacks.length) {
setImgSrc(defaultFallbacks[errorCount]);
setErrorCount(prev => prev + 1);
}
};

return (
<img
src={imgSrc}
alt={alt}
className={className}
onError={handleError}
loading={loading}
/>
);
};

export default CricketImage;
