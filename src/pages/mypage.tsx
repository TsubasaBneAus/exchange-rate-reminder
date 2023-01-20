import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const MyPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    // Redirect to sign in page if users have not signed in or logged in yet
    if (!session) {
      signIn("google", { callbackUrl: "/" });
    }
  }, [session])

  // Check if users have already signed up or logged in
  if (session) {
    return <h1>マイページ</h1>;
  } else {
    return null;
  }
};

export default MyPage;
