import { useEffect, useState } from "react";

export default function Welcome() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/auth/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.identifier));
  }, []);

  return <h2>Welcome {user}</h2>;
}

