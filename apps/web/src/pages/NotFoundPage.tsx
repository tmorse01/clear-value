import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../components/UI/EmptyState";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <EmptyState
      title="Page Not Found"
      message="The page you're looking for doesn't exist."
      actionLabel="Go to Home"
      onAction={() => navigate("/")}
      icon={<Home sx={{ fontSize: 64, color: "text.secondary" }} />}
    />
  );
}

