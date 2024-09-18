import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import theme from '../styles/theme.mui';
import { ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <NavBar />
            <Container sx={{ my: { xs: 10, md: 12 } }}>
              {children}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
