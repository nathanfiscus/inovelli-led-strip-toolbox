import React from "react";
import App from "./App";
import ThemeProvider from "./ThemeProvider";

class AppWrapper extends React.Component {
  render() {
    return (
      <ThemeProvider>
        {({
          setTheme,
          themeType,
          formatType,
          setFormat,
          setCalculationMethod,
          calculationMethod,
          setSceneMethod,
          sceneMethod,
        }) => <App />}
      </ThemeProvider>
    );
  }
}

export default AppWrapper;
