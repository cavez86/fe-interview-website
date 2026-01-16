import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { FiltersProvider } from "./providers/FiltersProvider";
import { ModalProvider } from "./providers/ModalProvider";
import { UsersProvider } from "./providers/UsersProvider";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <FiltersProvider>
      <UsersProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </UsersProvider>
    </FiltersProvider>
  </StrictMode>,
);
