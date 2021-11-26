import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

// * refresh token
async function refreshAccessToken() {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    // !we sending both value to spotify
    const { body: refreshToken } = await spotifyApi.refreshAccessToken();
    console.log("refreshToken is ", refreshToken);
    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000, // 1 hrs,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    };
  } catch (err) {
    console.log(err);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLINT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLINT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // ! if it was initial sign in, then we need to create a new user
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
          // ! we are handling  expiry at times in milliseconds hence =1000
        };
      }

      // Return the previous token if the access has token then it is not expired

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // ! Access token has expired, so we need to refresh it
      console.log("refreshing token");
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
