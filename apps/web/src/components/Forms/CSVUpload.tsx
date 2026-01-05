import { useState, useCallback } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  LinearProgress,
  Alert,
  Divider,
} from "@mui/material";
import { CloudUpload, InsertDriveFile, Science } from "@mui/icons-material";
import { parseCSV } from "../../services/parserService";
import { validateCSVFile } from "../../utils/validators";
import { useReportContext } from "../../contexts/ReportContext";
import { ErrorAlert } from "../UI/ErrorAlert";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { testComps } from "../../data/testData";
import type {
  ComparableProperty,
  PropertyType,
  PropertyCondition,
} from "@clearvalue/shared";
import type { ParsedComp } from "@clearvalue/shared";

export function CSVUpload() {
  const { setComps } = useReportContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [compsCount, setCompsCount] = useState<number>(0);

  const handleFile = useCallback(
    async (file: File) => {
      // Validate file
      const validationError = validateCSVFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      setWarnings([]);
      setIsUploading(true);
      setUploadedFile(file);

      try {
        const result = await parseCSV(file);

        if (result.success) {
          // Convert ParsedComp to ComparableProperty
          const comps: ComparableProperty[] = result.comps.map(
            (comp: ParsedComp) => {
              const yearBuilt =
                typeof comp.yearBuilt === "number" ? comp.yearBuilt : 0;
              return {
                address: typeof comp.address === "string" ? comp.address : "",
                salePrice:
                  typeof comp.salePrice === "number" ? comp.salePrice : 0,
                saleDate:
                  typeof comp.saleDate === "string" ? comp.saleDate : "",
                gla: typeof comp.gla === "number" ? comp.gla : 0,
                beds: typeof comp.beds === "number" ? comp.beds : 0,
                baths: typeof comp.baths === "number" ? comp.baths : 0,
                lotSize: typeof comp.lotSize === "number" ? comp.lotSize : 0,
                yearBuilt,
                propertyType: comp.propertyType as PropertyType | undefined,
                condition: comp.condition as PropertyCondition | undefined,
                latitude:
                  typeof comp.latitude === "number" ? comp.latitude : undefined,
                longitude:
                  typeof comp.longitude === "number"
                    ? comp.longitude
                    : undefined,
                age: new Date().getFullYear() - yearBuilt,
              };
            }
          );

          setComps(comps);
          setCompsCount(comps.length);
          setWarnings(result.warnings);

          if (result.errors.length > 0) {
            setError(`Some rows had errors: ${result.errors.join(", ")}`);
          }
        } else {
          setError("Failed to parse CSV file");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to upload CSV file"
        );
      } finally {
        setIsUploading(false);
      }
    },
    [setComps]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleLoadTestData = useCallback(() => {
    setError(null);
    setWarnings([]);
    setUploadedFile(null);
    setCompsCount(testComps.length);
    setComps(testComps);
  }, [setComps]);

  return (
    <Box>
      <Paper
        sx={{
          p: 4,
          border: `2px dashed ${isDragging ? "primary.main" : "grey.300"}`,
          backgroundColor: isDragging ? "action.hover" : "background.paper",
          transition: "all 0.2s",
          cursor: "pointer",
          "&:hover": {
            borderColor: "primary.main",
            backgroundColor: "action.hover",
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          style={{ display: "none" }}
          id="csv-upload-input"
        />
        <label htmlFor="csv-upload-input">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
            }}
          >
            {isUploading ? (
              <>
                <LoadingSpinner size={48} message="Parsing CSV file..." />
                <LinearProgress sx={{ width: "100%", mt: 2 }} />
              </>
            ) : (
              <>
                <CloudUpload sx={{ fontSize: 64, color: "primary.main" }} />
                <Typography variant="h6">
                  {uploadedFile ? "Upload Another CSV File" : "Upload CSV File"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Drag and drop your CSV file here, or click to browse
                </Typography>
                <Button variant="contained" component="span">
                  Select File
                </Button>
              </>
            )}
          </Box>
        </label>
      </Paper>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      <Button
        variant="outlined"
        startIcon={<Science />}
        onClick={handleLoadTestData}
        fullWidth
        sx={{ py: 1.5 }}
      >
        Load Test Data ({testComps.length} comparables)
      </Button>

      {uploadedFile && !isUploading && (
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <InsertDriveFile />
          <Typography variant="body2">{uploadedFile.name}</Typography>
          {compsCount > 0 && (
            <Typography variant="body2" color="text.secondary">
              ({compsCount} comps loaded)
            </Typography>
          )}
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 2 }}>
          <ErrorAlert error={error} onClose={() => setError(null)} />
        </Box>
      )}

      {warnings.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="warning">
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Warnings:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {warnings.map((warning, index) => (
                <li key={index}>
                  <Typography variant="body2">{warning}</Typography>
                </li>
              ))}
            </ul>
          </Alert>
        </Box>
      )}
    </Box>
  );
}
