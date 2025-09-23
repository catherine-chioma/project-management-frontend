import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsList from "./pages/ProjectList";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectDocuments from "./pages/ProjectDocuments";
import ProjectForm from "./components/ProjectForm"; // form component
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(ProjectsList, {}) }), _jsx(Route, { path: "/projects/:id", element: _jsx(ProjectDetail, {}) }), _jsx(Route, { path: "/projects/:id/documents", element: _jsx(ProjectDocuments, {}) }), _jsx(Route, { path: "/projects/:id/edit", element: _jsx(ProjectForm, { submitText: "Update Project", onSubmit: () => {
                            // TODO: implement update logic here
                        } }) })] }) }));
}
export default App;
