// Imports
// import { getWorks, getCategory } from "./api.js";
import { projectCollect } from "./projets.js";
import { categorieCollect } from "./filter.js";

// Appel de la fonction de creation de "Mes Projets"
projectCollect();

// Appel de la fonction de creation des "Filtres"
categorieCollect();
