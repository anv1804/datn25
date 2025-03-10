import React, { useRef } from 'react';

const AdminSideBarLeft = () => {
    const sidebarRef = useRef(null);

    return (
        <div ref={sidebarRef}>
            {/* your existing sidebar content */}
        </div>
    );
}; 