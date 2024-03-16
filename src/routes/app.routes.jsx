import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { DishDetails } from "../pages/DishDetails";
import { New } from "../pages/New";
import { Edit } from "../pages/Edit";
import { Favorites } from "../pages/Favorites";

export function AppRoutes({ isAdmin }) {
  return (
    <Routes>
      <Route path="/" element={<Home isAdmin={isAdmin} />} />
      <Route path="/new" element={<New isAdmin={isAdmin} />} />
      <Route path="/edit/:id" element={<Edit isAdmin={isAdmin} />} />
      <Route path="/dish/:id" element={<DishDetails isAdmin={isAdmin} />} />
      <Route path="/favorites" element={<Favorites isAdmin={isAdmin} />} />
    </Routes>
  );
}