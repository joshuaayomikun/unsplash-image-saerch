import { Box, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useSWR from "swr";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { AppAlert, useNotification } from "../src/components/app-alert";
import ImageLists from "../src/components/image-lists";
import { links } from "../src/constants/links";
import Navbar from "../src/layout/nav";
import Link from "../src/Link";
import { AuthContext } from "../src/providers/auth-provider";

export default function LikePhotos() {
    const {user, error} = useContext(AuthContext)
    const {data: myLikes} = useSWR<Basic[]>(typeof user === "undefined"? null:user.links.likes)
    const router = useRouter()
    const { notification, notify } = useNotification()
    const handleClose = () => {
      notify({
        isOpen: false
      })
    }
    if(typeof user === "undefined") {
        notify({
            isOpen:true,
            title:"You're not logged in!",
            status:"error"
        })
        router.push("/")
        return<> <Typography>You're not Logged In!</Typography>

          {typeof notification !== "undefined" && <AppAlert title={notification.title} isOpen={notification.isOpen} reason="" status={notification.status} handleClose={handleClose} />}
        </>
    }
    return (
        <>
            <Navbar />
            <main>
            <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h3"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
              >
                Liked Photos
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                These are photos you have liked from Unsplash
              </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                <Link href={links.homePage}>Go to Home Page</Link>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
                {typeof user !== "undefined" && typeof myLikes !== "undefined" && <ImageLists photos={myLikes} loading={typeof user === "undefined" && typeof myLikes === "undefined"} />}
                {typeof user !== "undefined" && typeof myLikes !== "undefined" && myLikes.length === 0 && <Typography>You have liked photos</Typography>}
            {typeof user === "undefined" || typeof myLikes === "undefined" && <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={"100%"} height={300} />
                </Grid>
                <Grid item xs={8}>
                    <Skeleton variant="rectangular" width={"100%"} height={300} />
                </Grid>
                <Grid item xs={8}>
                    <Skeleton variant="rectangular" width={"100%"} height={300} />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant="rectangular" width={"100%"} height={300} />
                </Grid>
            </Grid>}

        </Container>
            </main>
        
        </>
    )
}