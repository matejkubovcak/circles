import { Navigate, Route, Routes } from "react-router-dom";
import CuratorsTab, { CuratorView } from "./phone/CuratorsTab";
import FindTab from "./phone/FindTab";
import ListTab from "./phone/ListTab";
import PhoneShell from "./phone/PhoneShell";
import Home from "./pages/Home";
import Likes from "./pages/Likes";
import List from "./pages/List";
import Pass from "./pages/Pass";
import Place from "./pages/Place";
import Questions from "./pages/Questions";
import Welcome from "./pages/Welcome";
import { homePath, useApp } from "./state";

function Need({ ready, fallback, children }) {
  if (!ready) return <Navigate to={fallback} replace />;
  return children;
}

export default function App() {
  const { state } = useApp();

  return (
    <Routes>
      <Route path="/" element={state.onboarded ? <Navigate to={homePath} replace /> : <Welcome />} />
      <Route
        path="/questions"
        element={
          <Need ready={Boolean(state.name)} fallback="/">
            <Questions />
          </Need>
        }
      />
      <Route
        path="/likes"
        element={
          <Need ready={state.answers.length === 5} fallback={state.name ? "/questions" : "/"}>
            <Likes />
          </Need>
        }
      />
      <Route
        path="/pass"
        element={
          <Need ready={state.likes.length === 5} fallback="/likes">
            <Pass />
          </Need>
        }
      />
      <Route
        path="/home"
        element={
          <Need ready={state.onboarded} fallback="/">
            <Home />
          </Need>
        }
      />
      <Route path="/app" element={<PhoneShell />}>
        <Route index element={<ListTab />} />
        <Route path="find" element={<FindTab />} />
        <Route path="curators" element={<CuratorsTab />} />
        <Route path="curators/:id" element={<CuratorView />} />
        <Route path="place/:id" element={<Place />} />
      </Route>
      <Route
        path="/list/:id"
        element={
          <Need ready={state.onboarded} fallback="/">
            <List />
          </Need>
        }
      />
      <Route
        path="/place/:id"
        element={
          <Need ready={state.onboarded} fallback="/">
            <Place />
          </Need>
        }
      />
      <Route path="*" element={<Navigate to={state.onboarded ? homePath : "/"} replace />} />
    </Routes>
  );
}
