import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CharacterGrid from "./components/Characters/CharacterGrid";
import CharacterDetails from "./components/Characters/CharacterDetails";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#272727",
    },
  },
});

function App() {
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/characters" element={<CharacterGrid />} />
          <Route
            path="/characters/:characterId"
            element={<CharacterDetails />}
          />
        </Route>
        {/* Not kown pages redirects to home page */}
        <Route
          path="*"
          element={<Navigate to={`/characters${location.search}`} replace />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
