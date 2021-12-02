import React, { } from 'react';
import SearchProvider from '../src/providers/search-provider';
import Search from '../src/components/search';
import dynamic from "next/dynamic";
import Navbar from '../src/layout/nav';
import { Stack, Container, Box, Typography } from '@mui/material';
const SearchResult = dynamic(import('../src/components/search-results'))
export default function Index() {

  return (
    <SearchProvider>
      <Navbar />
      <main>
        {/* Hero unit */}
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
              Unsplash Image Search
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              A simple application to search for images utilizing APIs from Unsplash
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Search />
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <SearchResult />
        </Container>
      </main>
    </SearchProvider>
  );
}
