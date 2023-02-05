import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes as upload,
  getDownloadURL as getURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const refstorageRef = storageRef(storage, `${displayName + date}`);

      await upload(refstorageRef, file).then(() => {
        getURL(refstorageRef).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        });
      });
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <span className="title">Cadastro</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Escolha um nome de usuário" />
          <input type="email" placeholder="Digite seu e-mail" />
          <input type="password" placeholder="Escolha uma senha" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Adicione um avatar</span>
          </label>
          <button>Criar conta</button>
          {err && <span>Algo deu errado</span>}
        </form>
        <p>
          Você já possui uma conta? <Link to="/login">Conecte-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
