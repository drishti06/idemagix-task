import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import InstructorPanel from "./components/InstructorPanel";
import Login from "./components/Login";

function SubApp() {
  const location = useLocation();
  const excludeLocation = ["/"];
  const excluedeNav = excludeLocation.includes(location.pathname);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("authority");
    navigate("/");
  };
  return (
    <>
      {excluedeNav ? (
        ""
      ) : (
        <div className="min-h-[10dvh] border p-2  flex items-center justify-between">
          <span className="text-3xl">Navbar</span>
          <button
            onClick={handleLogout}
            className="text-xl cursor-pointer bg-black px-3 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
      <Routes>
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/instructor" element={<InstructorPanel />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SubApp />
    </BrowserRouter>
  );
}

export default App;
