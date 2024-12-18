// components/LoadingSkeleton.js

import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const LoadingSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
            <div>
                <Skeleton count={3} height={30} style={{ marginBottom: '10px' }} /> {/* Adjust height and count as needed */}
                <Skeleton height={150} style={{ marginBottom: '10px' }} /> {/* For larger elements */}
            </div>
        </SkeletonTheme>
    );
};

export default LoadingSkeleton;
