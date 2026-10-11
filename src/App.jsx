
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export default function App() {
  const [user, setUser] = useState(null);
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("Information Technology");
  const [year, setYear] = useState("3rd Year");
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setSaved(false);

      if (currentUser) {
        setEmail(currentUser.email || "");
        setName(currentUser.displayName || "");

        try {
          const result = await getDoc(
            doc(db, "users", currentUser.uid)
          );

          if (result.exists()) {
            const data = result.data();
            setName(data.name || currentUser.displayName || "");
            setDepartment(data.department || "Information Technology");
            setYear(data.year || "3rd Year");
            setSaved(true);
          }
        } catch (error) {
          setMessage(error.message);
        }
      }
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      if (register) {
        const result = await createUserWithEmailAndPassword(
          auth, email, password
        );

        await updateProfile(result.user, {
          displayName: name,
        });

        setMessage("Registration successful!");
      } else {
        await signInWithEmailAndPassword(
          auth, email, password
        );

        setMessage("Login successful!");
      }
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function googleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage("Google login successful!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveDetails(e) {
    e.preventDefault();

    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        email: user.email,
        department,
        year,
      });

      setSaved(true);
      setMessage("Details saved successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function logout() {
    await signOut(auth);
    setMessage("Logged out successfully!");
  }

  return (
    <div style={{
      maxWidth: 450, margin: "50px auto",
      padding: 25, fontFamily: "Arial",
      border: "1px solid #ddd", borderRadius: 12
    }}>
      <h1>Sample App</h1>
      <p>Firebase Authentication and Database</p>

      {!user ? (
        <>
          <h2>{register ? "Register" : "Login"}</h2>

          <form onSubmit={handleSubmit}>
            {register && (
              <input
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password (minimum 6 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <button type="submit">
              {register ? "Register" : "Login"}
            </button>
          </form>

          <button onClick={googleLogin}>
            Sign in with Google
          </button>

          <p>
            {register ? "Already registered?" : "New user?"}
            <button onClick={() => setRegister(!register)}>
              {register ? "Login" : "Register"}
            </button>
          </p>
        </>
      ) : (
        <>
          <h2>Welcome, {user.displayName || user.email}</h2>
          <p>Email: {user.email}</p>

          <h3>Student Details</h3>
          <form onSubmit={saveDetails}>
            <input
              placeholder="Full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />

            <label>Department</label>
            <select
              value={department}
              onChange={e => setDepartment(e.target.value)}
            >
              <option>Information Technology</option>
              <option>Computer Science</option>
              <option>Electronics and Communication</option>
              <option>Mechanical Engineering</option>
              <option>Other</option>
            </select>

            <label>Year</label>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
            >
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

            <button type="submit">Save Details</button>
          </form>

          {saved && (
            <div>
              <h3>Saved Details</h3>
              <p>Name: {name}</p>
              <p>Email: {user.email}</p>
              <p>Department: {department}</p>
              <p>Year: {year}</p>
            </div>
          )}

          <button onClick={logout}>Logout</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}
