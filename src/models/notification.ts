type notificationStatus = "error" | "success" | "warning" | "info"


export interface Notification {
    status?: notificationStatus,
    title?: string,
    isOpen:boolean
}
