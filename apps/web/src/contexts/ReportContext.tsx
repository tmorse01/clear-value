import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type {
  SubjectProperty,
  ComparableProperty,
  Report,
  RegressionConfig,
  ModelType,
} from "@clearvalue/shared";

interface ReportState {
  subject: SubjectProperty | null;
  comps: ComparableProperty[];
  report: Report | null;
  loading: boolean;
  error: string | null;
  config: RegressionConfig;
}

type ReportAction =
  | { type: "SET_SUBJECT"; payload: SubjectProperty | null }
  | { type: "SET_COMPS"; payload: ComparableProperty[] }
  | { type: "SET_REPORT"; payload: Report | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_CONFIG"; payload: Partial<RegressionConfig> }
  | { type: "CLEAR_REPORT" }
  | { type: "CLEAR_ALL" };

const initialState: ReportState = {
  subject: null,
  comps: [],
  report: null,
  loading: false,
  error: null,
  config: {
    modelType: "linear" as ModelType,
    includeTimeAdjustment: true,
    includeDistanceAdjustment: true,
    minComps: 3,
    maxComps: 15,
  },
};

function reportReducer(state: ReportState, action: ReportAction): ReportState {
  switch (action.type) {
    case "SET_SUBJECT":
      return { ...state, subject: action.payload };
    case "SET_COMPS":
      return { ...state, comps: action.payload };
    case "SET_REPORT":
      return { ...state, report: action.payload, loading: false, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_CONFIG":
      return { ...state, config: { ...state.config, ...action.payload } };
    case "CLEAR_REPORT":
      return { ...state, report: null, error: null };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
}

interface ReportContextValue {
  state: ReportState;
  setSubject: (subject: SubjectProperty | null) => void;
  setComps: (comps: ComparableProperty[]) => void;
  setReport: (report: Report | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setConfig: (config: Partial<RegressionConfig>) => void;
  clearReport: () => void;
  clearAll: () => void;
}

const ReportContext = createContext<ReportContextValue | undefined>(undefined);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reportReducer, initialState);

  const setSubject = (subject: SubjectProperty | null) => {
    dispatch({ type: "SET_SUBJECT", payload: subject });
  };

  const setComps = (comps: ComparableProperty[]) => {
    dispatch({ type: "SET_COMPS", payload: comps });
  };

  const setReport = (report: Report | null) => {
    dispatch({ type: "SET_REPORT", payload: report });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const setConfig = (config: Partial<RegressionConfig>) => {
    dispatch({ type: "SET_CONFIG", payload: config });
  };

  const clearReport = () => {
    dispatch({ type: "CLEAR_REPORT" });
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  return (
    <ReportContext.Provider
      value={{
        state,
        setSubject,
        setComps,
        setReport,
        setLoading,
        setError,
        setConfig,
        clearReport,
        clearAll,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReportContext() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useReportContext must be used within a ReportProvider");
  }
  return context;
}

