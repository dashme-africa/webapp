import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./app/store";
import { CartProvider } from "./context/CartContext";
import App from "./App.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Render the app with all providers in the correct order
createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<CartProvider>
			<I18nextProvider i18n={i18n}>
				<App />
			</I18nextProvider>
		</CartProvider>
	</Provider>
);
