import * as React from "react";
import { LOAuth } from "@lifeomic/app-tools";
import { authClientId, authRoot } from "../secrets";

export const AuthProvider: React.FC<{
  children: (token: string) => React.ReactNode;
}> = props => {
  const [token, setToken] = React.useState<string | null>(null);
  React.useEffect(() => {
    try {
      const config = {
        clientId: authClientId,
        authorizationUri: `${authRoot}/oauth2/authorize`,
        scopes: ["email"],
        redirectUri: "http://localhost:3000",
        logoutUri: `${authRoot}/logout`,
        logoutRedirectUri: `"http://localhost:3000/logout"`,
        accessTokenUri: `${authRoot}/oauth2/token`
      };
      const auth = new LOAuth(config);

      auth.startAutomaticTokenRefresh(config).then(() => {
        const accessToken = auth.getAccessToken();
        console.log(accessToken);
        setToken(accessToken);
      });
    } catch (e) {
      console.log("error" + e.toString());
    }
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>token: {token}</div>
      {props.children(token)}
    </div>
  );
};
