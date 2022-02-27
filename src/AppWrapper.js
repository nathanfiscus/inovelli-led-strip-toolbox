import React from "react";
import App from "./App";
import ThemeProvider from "./ThemeProvider";

class AppWrapper extends React.Component {
  render() {
    return (
      <ThemeProvider>
        {({ setTheme, themeType }) => (
          <App setTheme={setTheme} theme={themeType} />
        )}
      </ThemeProvider>
    );
  }
}

export default AppWrapper;
