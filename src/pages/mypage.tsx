import { useSession } from "next-auth/react";

const MyPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <h1>アカウント登録またはログインしてください</h1>
  } else {
    return <h1>マイページ</h1>;
  }
};

export default MyPage;
