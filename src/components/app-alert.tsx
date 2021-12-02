import { AlertProps, Alert as MuiAlert, Snackbar } from "@mui/material";
import React, { forwardRef, useState } from "react";
import { Notification } from "../models/notification";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const useNotification = () => {
    const [notification, setNotification] = useState<Notification>()

    const notify = (d: Notification) => {
        setNotification(d)
    }

    return { notification, notify }
}

interface AppAlertProps extends Notification {
    handleClose: (reason:string) => void,
    reason: string
}

export const AppAlert = (props:AppAlertProps) => {

    return (
        <>
            {props.isOpen && <Snackbar open={props.isOpen} autoHideDuration={6000} onClose={() =>props.handleClose(props.reason)}>
                <Alert onClose={() =>props.handleClose(props.reason)} severity={props.status} sx={{ width: '100%' }}>
                    {props.title}
                </Alert>
            </Snackbar>}
        </>
    )
}