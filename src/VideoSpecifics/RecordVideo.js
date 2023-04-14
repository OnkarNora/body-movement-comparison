import React from 'react'

function RecordVideo({isSidebarOpen}) {
    return (
        <div className={isSidebarOpen ? "alert alert-danger record-video left-marging":"alert record-video alert-danger"} role="alert">
            <h4 class="alert-heading">Sorry, this feature is not available at the moment.</h4>
            <p>We apologize for the inconvenience. Our team is working hard to implement this feature and we hope to have it available soon. If you have any questions or concerns, please don't hesitate to contact our support team at support@example.com.</p>
            <hr />
                <p class="mb-0">Thank you for your understanding.</p>
        </div>
    )
}

export default RecordVideo