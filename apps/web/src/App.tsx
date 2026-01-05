import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReportProvider } from "./contexts/ReportContext";
import { PageLayout } from "./components/Layout/PageLayout";
import { HomePage } from "./pages/HomePage";
import { CreateReportPage } from "./pages/CreateReportPage";
import { ReportPage } from "./pages/ReportPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <ReportProvider>
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateReportPage />} />
            <Route path="/report/:reportId?" element={<ReportPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageLayout>
      </ReportProvider>
    </BrowserRouter>
  );
}

export default App;
