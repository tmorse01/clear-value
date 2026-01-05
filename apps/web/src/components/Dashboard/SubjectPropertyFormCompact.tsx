import { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Map } from "@mui/icons-material";
import { useReportContext } from "../../contexts/ReportContext";
import { validateSubjectProperty } from "../../utils/validators";
import { validateSubject, type SubjectPropertyInput } from "../../services/subjectService";
import { ErrorAlert } from "../UI/ErrorAlert";

export function SubjectPropertyFormCompact() {
  const { state, setSubject, setLoading, setError } = useReportContext();
  const [formData, setFormData] = useState<Partial<SubjectPropertyInput>>({
    address: state.subject?.address || "",
    beds: state.subject?.beds || 3,
    baths: state.subject?.baths || 2,
    gla: state.subject?.gla || 2000,
    lotSize: state.subject?.lotSize || 0.25,
    yearBuilt: state.subject?.yearBuilt || new Date().getFullYear(),
    propertyType: state.subject?.propertyType || "single_family",
    condition: state.subject?.condition || undefined,
    notes: state.subject?.notes || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [manualCoords, setManualCoords] = useState(false);
  const [latitude, setLatitude] = useState<number | "">(state.subject?.coordinates?.latitude || "");
  const [longitude, setLongitude] = useState<number | "">(state.subject?.coordinates?.longitude || "");

  const handleChange = (field: keyof SubjectPropertyInput, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof SubjectPropertyInput) => {
    const value = formData[field];
    if (value !== undefined) {
      const validation = validateSubjectProperty({ [field]: value });
      if (validation[field]) {
        setErrors((prev) => ({ ...prev, [field]: validation[field] }));
      }
    }
  };

  const handleSave = async () => {
    const validationErrors = validateSubjectProperty(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const inputData: SubjectPropertyInput = {
        ...(formData as SubjectPropertyInput),
      };

      const result = await validateSubject(inputData);

      if (result.valid && result.normalized) {
        const normalized = { ...result.normalized };
        if (manualCoords && latitude !== "" && longitude !== "") {
          normalized.coordinates = {
            latitude: Number(latitude),
            longitude: Number(longitude),
          };
        }
        setSubject(normalized);
        setError(null);
      } else {
        const errorMessages = result.errors?.map((e) => e.message).join(", ");
        setError(errorMessages || "Validation failed");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to validate subject property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Property Address"
            value={formData.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            onBlur={() => handleBlur("address")}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>

        {manualCoords && (
          <>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="Latitude"
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value ? Number(e.target.value) : "")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="Longitude"
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value ? Number(e.target.value) : "")}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={manualCoords}
                onChange={(e) => setManualCoords(e.target.checked)}
                size="small"
              />
            }
            label="Enable manual coordinate input"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<Map />}
            size="small"
            fullWidth
            disabled
          >
            Open Map
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Square Feet"
            type="number"
            value={formData.gla || ""}
            onChange={(e) => handleChange("gla", parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur("gla")}
            error={!!errors.gla}
            helperText={errors.gla}
            inputProps={{ min: 100, max: 20000 }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label="Bedroom"
            type="number"
            value={formData.beds || ""}
            onChange={(e) => handleChange("beds", parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur("beds")}
            error={!!errors.beds}
            inputProps={{ min: 1, max: 10 }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label="Bathroom"
            type="number"
            value={formData.baths || ""}
            onChange={(e) => handleChange("baths", parseFloat(e.target.value) || 0)}
            onBlur={() => handleBlur("baths")}
            error={!!errors.baths}
            inputProps={{ min: 0.5, max: 10, step: 0.5 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Year Built"
            type="number"
            value={formData.yearBuilt || ""}
            onChange={(e) => handleChange("yearBuilt", parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur("yearBuilt")}
            error={!!errors.yearBuilt}
            inputProps={{ min: 1800, max: new Date().getFullYear() }}
          />
        </Grid>

        {state.error && (
          <Grid item xs={12}>
            <ErrorAlert error={state.error} />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSave}
            fullWidth
            size="small"
            disabled={state.loading}
          >
            {state.loading ? "Saving..." : "Save"}
          </Button>
        </Grid>

        {state.subject && (
          <Grid item xs={12}>
            <Typography variant="caption" color="success.main">
              ✓ Subject property saved
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

