import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IUser {
  displayName: string | null;
  photoURL: string | null;
}

const Nav = () => {
  const storageValue = localStorage.getItem("userData");
  const initialUserData = storageValue ? JSON.parse(storageValue) : null;

  const [show, setShow] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser | null>(initialUserData);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleAuth = (): void => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => alert(error.message));
  };

  const handleLogout = (): void => {
    signOut(auth)
      .then(() => {
        setUserData(null);
        localStorage.removeItem("userData");
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인 페이지에서만 로직이 발생하도록 변경
        if (pathname === "/") navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate, pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (): void => {
    if (window.screenY > 50) setShow(true);
    else setShow(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          src="/images/logo.svg"
          alt="Disney Plus Logo"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            onChange={handleChange}
            className="nav__input"
            type="text"
            placeholder="Seacrh your movie..."
          />
          {userData && (
            <>
              <SignOut>
                <UserImg
                  src={userData.photoURL || ""}
                  alt={userData.displayName || ""}
                />
                <DropDown>
                  <span onClick={handleLogout}>Sign out</span>
                </DropDown>
              </SignOut>
            </>
          )}
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;

const UserImg = styled.img`
    border-radius: 50%:
    width: 100%;
    height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover ${DropDown} {
    opacity: 1;
    transition-duration: 1s;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

const NavWrapper = styled.nav<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;
