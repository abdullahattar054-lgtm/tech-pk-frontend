import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuthWrapper = ({ children }) => {
    // Using the User provided Client ID
    const clientId = "402759898682-vtrfq3m4siklnppkd1p749ogig0sncgj.apps.googleusercontent.com";

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthWrapper;
