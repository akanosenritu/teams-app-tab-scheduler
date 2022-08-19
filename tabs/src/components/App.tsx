import React, { useEffect } from "react"
import Tab from "./Tab"
import "./App.css"
import {Box, Container, Typography} from "@mui/material"

/**
 * The main app which handles the initialization and routing
 * of the app.
 */

export default function App() {  
  return <Container maxWidth="md" sx={{display: "flex", justifyContent: "center"}}>
    <Box>
      <Tab />
    </Box>
  </Container>
}
