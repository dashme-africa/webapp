import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation data
const resources = {
    en: {
        translation: {
            welcome: "Welcome",
            searchPlaceholder: "Search for items",
            signUp: "Sign Up",
            uploadText: "Upload",
            clothes: "Clothes",
            electronics: "Electronics",
            householdItems: "Household Items",
            accessories: "Accessories",
            language: "Language",
            logout: "Log out",
            noProduct: "No product has been uploaded yet",
            "footer": {
                "smilePrompt": "WANT TO PUT A SMILE ON SOMEONE'S FACE?",
                "sell": "Sell",
                "donate": "Donate",
                "signupPrompt": "SIGN UP TO RECEIVE WEEKEND DISCOUNT OFFERS",
                "logoAlt": "DashMeAfrica Logo",
                "missionTitle": "Our Mission",
                "missionDescription": "To become the leading online marketplace where we help you donate or sell your used items at giveaway prices, thereby reducing CO2 emissions through our platform.",
                "waphone": "Whatsapp number",
                "email": "Email",
                "copyRight": "DashMeAfrica © {{year}}"
            },
            "home": {
                "recommended": "Recommended for You",
                "seeAll": "See All"
            },
            "profile": {
                "editProfile": "Edit Your Profile",
                "fullName": "Full Name",
                "email": "Email",
                "address": "Address",
                "bio": "Bio",
                "saveChanges": "Save Changes",
                "uploadPicture": "Upload Picture",
                "bankDetails": "Verify Bank Details", //not updated
                "accountName": "Account Name",
                "accountNumber": "Account Number",
                "bankName": "Bank Name",
                "verify": "Verify",
                "verified": "Verified",
                "profileUpdated": "Profile updated successfully.",
                "failedToUpdate": "Failed to update profile.",
                "verifyBankDetails": "Please verify your bank details to complete profile info.", //not updated
                "bankVerified": "Bank details verified successfully. Save changes to update profile", //not updated 
                "bankVerificationFailed": "Failed to verify bank details.",
                "loading": "Loading...",
            },
            "upload": {
                "sell": "Sell",
                "donate": "Donate",
                "uploadPhotos": "Upload Photos",
                "title": "Title",
                "myProducts": "My Products",
                "enterTitle": "Enter title",
                "description": "Description",
                "enterDescription": "Enter product description", //not updated
                "itemCategory": "Item Category",
                "selectCategory": "Select category",
                "price": "Price",
                "enterPrice": "Enter price (N500 - N50,000)", //not updated
                "priceCategory": "Price Category",
                "selectPriceCategory": "Select category",
                "location": "Location",
                "enterLocation": "Enter location",
                "submit": "Submit",
                "submitting": "Submitting...",
                "successMessage": "Product Successfully Uploaded and is pending approval.", //updated
                "errorMessage": "Failed to submit. Please try again.",
                "verifiedError": "Your bank details are not verified. Please verify your bank details in your profile page.",
                "addImageError": "Please add the product image",
                "setAsPrimary": "Set Primary", 
                "selectPrimaryImage": "Please select a primary image for display",
                "maxImagesError": "You can upload a maximum of 10 images",
            },
            "product": {
                "priceLabel": "Price: ",
                "locationLabel": "Location: ",
                "tagSell": "For Sale",
                "donate": "Donate",
            }

        },
    },
    fr: {
        translation: {
            welcome: "Bienvenue",
            searchPlaceholder: "Rechercher des articles",
            signUp: "S'inscrire",
            uploadText: "Télécharger",
            clothes: "Vêtements",
            electronics: "Électronique",
            householdItems: "Articles ménagers",
            accessories: "Accessoires",
            upload: "Télécharger",
            language: "Langue",
            logout: "Se déconnecter",
            "footer": {
                "smilePrompt": "VOUS VOULEZ METTRE UN SOURIRE SUR LE VISAGE DE QUELQU'UN ?",
                "sell": "Vendre",
                "donate": "Donner",
                "signupPrompt": "INSCRIVEZ-VOUS POUR RECEVOIR DES OFFRES DE RÉDUCTION DU WEEK-END",
                "logoAlt": "Logo DashMeAfrica",
                "missionTitle": "Notre Mission",
                "missionDescription": "Devenir la principale place de marché en ligne où nous vous aidons à donner ou à vendre vos articles d'occasion à des prix exceptionnels, réduisant ainsi les émissions de CO2 grâce à notre plateforme.",
                "waphone": "Numéro de téléphone",
                "email": "E-mail",
                "copyRight": "DashMeAfrica © {{year}}"
            },
            "home": {
                "recommended": "Recommandé pour vous",
                "seeAll": "Voir tout"
            },
            "profile": {
                "editProfile": "Modifier votre profil",
                "fullName": "Nom complet",
                "email": "E-mail",
                "address": "Adresse",
                "bio": "Biographie",
                "saveChanges": "Sauvegarder les modifications",
                "uploadPicture": "Télécharger une photo",
                "bankDetails": "Détails bancaires",
                "accountName": "Nom du compte",
                "accountNumber": "Numéro de compte",
                "bankName": "Nom de la banque",
                "verify": "Vérifier",
                "verified": "Vérifié",
                "profileUpdated": "Profil mis à jour avec succès.",
                "failedToUpdate": "Échec de la mise à jour du profil.",
                "verifyBankDetails": "Veuillez vérifier vos coordonnées bancaires avant de sauvegarder.",
                "bankVerified": "Détails bancaires vérifiés avec succès.",
                "bankVerificationFailed": "Échec de la vérification des détails bancaires.",
                "loading": "Chargement...",
            },
            "upload": {
                "sell": "Vendre",
                "donate": "Donner",
                "uploadPhotos": "Télécharger des photos",
                "title": "Titre",
                "myProducts": "Mes Produits",
                "enterTitle": "Entrez le titre",
                "description": "Description",
                "enterDescription": "Entrez la description",
                "itemCategory": "Catégorie d'article",
                "selectCategory": "Choisir une catégorie",
                "price": "Prix",
                "enterPrice": "Entrez le prix",
                "priceCategory": "Catégorie de prix",
                "selectPriceCategory": "Choisir une catégorie",
                "location": "Lieu",
                "enterLocation": "Entrez le lieu",
                "submit": "Soumettre",
                "submitting": "Soumission en cours...",
                "successMessage": "Produit téléchargé avec succès",
                "errorMessage": "Échec de la soumission. Veuillez réessayer.",
                "verifiedError": "Vos coordonnées bancaires ne sont pas vérifiées. Veuillez les vérifier dans votre page de profil.",
                "addImageError": "Veuillez ajouter l'image du produit",
                "setAsPrimary": "Primary"
            },
            "product": {
                "priceLabel": "Prix: ",
                "locationLabel": "Emplacement: ",
                "tagSell": "À vendre",
                "donate": "Faire un don",
            }
        },
    },
    es: {
        translation: {
            welcome: "Bienvenido",
            searchPlaceholder: "Buscar artículos",
            signUp: "Regístrate",
            uploadText: "Subir",
            clothes: "Ropa",
            electronics: "Electrónica",
            householdItems: "Artículos para el hogar",
            accessories: "Accesorios",
            upload: "Subir",
            language: "Idioma",
            logout: "Salir",
            "footer": {
                "smilePrompt": "¿QUIERES PONER UNA SONRISA EN LA CARA DE ALGUIEN?",
                "sell": "Vender",
                "donate": "Donar",
                "signupPrompt": "REGÍSTRATE PARA RECIBIR OFERTAS DE DESCUENTO DE FIN DE SEMANA",
                "logoAlt": "Logotipo de DashMeAfrica",
                "missionTitle": "Nuestra Misión",
                "missionDescription": "Convertirnos en el principal mercado en línea donde te ayudamos a donar o vender tus artículos usados a precios increíbles, reduciendo así las emisiones de CO2 a través de nuestra plataforma.",
                "waphone": "Número de teléfono",
                "email": "Correo electrónico",
                "copyRight": "DashMeAfrica © {{year}}"
            },
            "home": {
                "recommended": "Recomendado para ti",
                "seeAll": "Ver todo"
            },
            "profile": {
                "editProfile": "Editar tu perfil",
                "fullName": "Nombre completo",
                "email": "Correo electrónico",
                "address": "Dirección",
                "bio": "Biografía",
                "saveChanges": "Guardar cambios",
                "uploadPicture": "Subir foto",
                "bankDetails": "Detalles bancarios",
                "accountName": "Nombre de la cuenta",
                "accountNumber": "Número de cuenta",
                "bankName": "Nombre del banco",
                "verify": "Verificar",
                "verified": "Verificado",
                "profileUpdated": "Perfil actualizado con éxito.",
                "failedToUpdate": "Error al actualizar el perfil.",
                "verifyBankDetails": "Verifique los detalles de su banco antes de guardar.",
                "bankVerified": "Detalles bancarios verificados con éxito.",
                "bankVerificationFailed": "Error al verificar los detalles bancarios.",
                "loading": "Cargando...",
            },
            "upload": {
                "sell": "Vender",
                "donate": "Donar",
                "uploadPhotos": "Subir fotos",
                "title": "Título",
                "myProducts": "Mis Productos",
                "enterTitle": "Ingrese el título",
                "description": "Descripción",
                "enterDescription": "Ingrese la descripción",
                "itemCategory": "Categoría del artículo",
                "selectCategory": "Seleccionar categoría",
                "price": "Precio",
                "enterPrice": "Ingrese el precio",
                "priceCategory": "Categoría de precio",
                "selectPriceCategory": "Seleccionar categoría",
                "location": "Ubicación",
                "enterLocation": "Ingrese la ubicación",
                "submit": "Enviar",
                "submitting": "Enviando...",
                "successMessage": "Producto subido con éxito",
                "errorMessage": "Error al enviar. Inténtalo de nuevo.",
                "verifiedError": "Sus datos bancarios no están verificados. Verifíquelos en la página de su perfil.",
                "addImageError": "Por favor agregue la imagen del producto",
            },
            "product": {
                "priceLabel": "Precio: ",
                "locationLabel": "Ubicación: ",
                "tagSell": "En venta",
                "donate": "Donar",
            }
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
