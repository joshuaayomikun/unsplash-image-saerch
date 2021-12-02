
import { CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { AppAlert, useNotification } from "../src/components/app-alert"
import { AuthContext } from "../src/providers/auth-provider"

export default function Callback() {
  const { loginWithunSplash } = useContext(AuthContext)
  const { notification, notify } = useNotification()
  const router = useRouter()
  useEffect(() => {
    // debugger
    const url = new URL(`${window.location.protocol}//${window.location.host}${router.asPath}`).search
    const code = new URLSearchParams(url).get("code");
    if (typeof window !== "undefined" && typeof code !== "undefined") {
      // debugger
      loginWithunSplash(code as string).then(() => {
        // debugger 
        notify({
          isOpen: true,
          title: "Login successful",
          status:"success"
        })
        router.push("/")
      }).catch((err) => {
        // debugger
        typeof err !== "undefined" ?
          notify({
            status: "error",
            isOpen: true,
            title: typeof err.message === "undefined" ? err : err.message
          }) :
          notify({
            status: "error",
            isOpen: true,
            title: "An error occurred"
          })
        router.push("/")
      })
    }
  }, [])

  const handleClose = () => {
    notify({
      isOpen: false
    })
  }

  return (
    <>
      <Box sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }} >
        <CircularProgress sx={{
          margin: "auto"
        }} size="120px" />
      </Box>
      {typeof notification !== "undefined" && <AppAlert title={notification.title} isOpen={notification.isOpen} reason="" status={notification.status} handleClose={handleClose} />}
    </>
  )
}
