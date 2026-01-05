import { StepConnector, stepConnectorClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { StepIconProps } from "@mui/material";

export const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 3,
    borderRadius: 1,
    borderColor: theme.palette.primary.light,
  },
}));

export function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  return (
    <div
      className={className}
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: completed || active ? "#2196f3" : "#e0e0e0",
        color: completed || active ? "#fff" : "#9e9e9e",
        transition: "all 0.3s ease",
        boxShadow:
          completed || active ? "0 4px 14px rgba(33, 150, 243, 0.3)" : "none",
        fontSize: "1.25rem",
        fontWeight: 700,
      }}
    >
      {icon}
    </div>
  );
}
