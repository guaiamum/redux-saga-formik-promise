import React from "react";

import Forms from "./components/Forms";
import { AppStore } from "./store";
import "./App.scss";

export const App = () => {
  return (
    <AppStore>
      <main>
        <Forms />
      </main>
    </AppStore>
  );
};
