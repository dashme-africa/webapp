import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation data
const resources = {
    en: {
        translation: {
            welcome: "Welcome",
            searchPlaceholder: "Search for items",
            signUp: "Sign Up",
            upload: "Upload",
            clothes: "Clothes",
            householdItems: "Household Items",
            accessories: "Accessories",
            language: "Language",
            "footer": {
                "smilePrompt": "WANT TO PUT A SMILE ON SOMEONE'S FACE?",
                "sell": "Sell",
                "donate": "Donate",
                "signupPrompt": "SIGN UP TO RECEIVE WEEKEND DISCOUNT OFFERS",
                "logoAlt": "DashMeAfrica Logo",
                "missionTitle": "Our Mission",
                "missionDescription": "To become the leading online marketplace where we help you donate or sell your used items at giveaway prices, thereby reducing CO2 emissions through our platform.",
                "phone": "Phone number",
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
                "bankDetails": "Bank Details",
                "accountName": "Account Name",
                "accountNumber": "Account Number",
                "bankName": "Bank Name",
                "verify": "Verify",
                "verified": "Verified",
                "profileUpdated": "Profile updated successfully.",
                "failedToUpdate": "Failed to update profile.",
                "verifyBankDetails": "Please verify your bank details before saving.",
                "bankVerified": "Bank details verified successfully.",
                "bankVerificationFailed": "Failed to verify bank details.",
                "loading": "Loading...",
            }

        },
    },
    fr: {
        translation: {
            welcome: "Bienvenue",
            searchPlaceholder: "Rechercher des articles",
            signUp: "S'inscrire",
            upload: "Télécharger",
            clothes: "Vêtements",
            householdItems: "Articles ménagers",
            accessories: "Accessoires",
            upload: "Télécharger",
            language: "Langue",
            "footer": {
                "smilePrompt": "VOUS VOULEZ METTRE UN SOURIRE SUR LE VISAGE DE QUELQU'UN ?",
                "sell": "Vendre",
                "donate": "Donner",
                "signupPrompt": "INSCRIVEZ-VOUS POUR RECEVOIR DES OFFRES DE RÉDUCTION DU WEEK-END",
                "logoAlt": "Logo DashMeAfrica",
                "missionTitle": "Notre Mission",
                "missionDescription": "Devenir la principale place de marché en ligne où nous vous aidons à donner ou à vendre vos articles d'occasion à des prix exceptionnels, réduisant ainsi les émissions de CO2 grâce à notre plateforme.",
                "phone": "Numéro de téléphone",
                "email": "E-mail",
                "copyRight": "DashMeAfrica © {{year}}"
            },
            "home": {
                "recommended": "Recommandé pour vous",
                "seeAll": "Voir tout"
            },
            "profile": {
                editProfile: "Modifier votre profil",
                fullName: "Nom complet",
                email: "E-mail",
                address: "Adresse",
                bio: "Biographie",
                saveChanges: "Sauvegarder les modifications",
                uploadPicture: "Télécharger une photo",
                bankDetails: "Détails bancaires",
                accountName: "Nom du compte",
                accountNumber: "Numéro de compte",
                bankName: "Nom de la banque",
                verify: "Vérifier",
                verified: "Vérifié",
                profileUpdated: "Profil mis à jour avec succès.",
                failedToUpdate: "Échec de la mise à jour du profil.",
                verifyBankDetails: "Veuillez vérifier vos coordonnées bancaires avant de sauvegarder.",
                bankVerified: "Détails bancaires vérifiés avec succès.",
                bankVerificationFailed: "Échec de la vérification des détails bancaires.",
                loading: "Chargement...",
            }
        },
    },
    es: {
        translation: {
            welcome: "Bienvenido",
            searchPlaceholder: "Buscar artículos",
            signUp: "Regístrate",
            upload: "Subir",
            clothes: "Ropa",
            householdItems: "Artículos para el hogar",
            accessories: "Accesorios",
            upload: "Subir",
            language: "Idioma",
            "footer": {
                "smilePrompt": "¿QUIERES PONER UNA SONRISA EN LA CARA DE ALGUIEN?",
                "sell": "Vender",
                "donate": "Donar",
                "signupPrompt": "REGÍSTRATE PARA RECIBIR OFERTAS DE DESCUENTO DE FIN DE SEMANA",
                "logoAlt": "Logotipo de DashMeAfrica",
                "missionTitle": "Nuestra Misión",
                "missionDescription": "Convertirnos en el principal mercado en línea donde te ayudamos a donar o vender tus artículos usados a precios increíbles, reduciendo así las emisiones de CO2 a través de nuestra plataforma.",
                "phone": "Número de teléfono",
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
