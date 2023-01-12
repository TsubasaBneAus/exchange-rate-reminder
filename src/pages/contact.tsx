import { useRef } from "react";

const Contact = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("送信中・・・");
    console.log(nameRef.current?.value);

    let data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) console.log("送信に成功しました");
    });
  };

  return (
    <div>
      <h2>Next.jsでメール送信</h2>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            お名前
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            required
            ref={nameRef}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            メールアドレス
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            required
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            メッセージ
          </label>
          <textarea
            className="form-control"
            id="message"
            required
            ref={messageRef}
          />
        </div>
        <button className="btn btn-danger" type="submit">
          メール送信
        </button>
      </form>
    </div>
  );
}

export default Contact;