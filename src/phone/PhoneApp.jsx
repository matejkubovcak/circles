import { Navigate, Route, Routes } from "react-router-dom";
import Place from "../pages/Place";
import CuratorsTab, { CuratorView } from "./CuratorsTab";
import FindTab from "./FindTab";
import ListTab from "./ListTab";
import PhoneShell from "./PhoneShell";

export default function PhoneApp() {
  return (
    <PhoneShell>
      <Routes>
        <Route index element={<ListTab />} />
        <Route path="find" element={<FindTab />} />
        <Route path="curators" element={<CuratorsTab />} />
        <Route path="curators/:id" element={<CuratorView />} />
        <Route path="place/:id" element={<Place />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </PhoneShell>
  );
}
