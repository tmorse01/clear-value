import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Button,
  Typography,
  Chip,
  InputAdornment,
} from "@mui/material";
import { Science } from "@mui/icons-material";
import { useReportContext } from "../../contexts/ReportContext";
import { validateSubjectProperty } from "../../utils/validators";
import { validateSubject, type SubjectPropertyInput } from "../../services/subjectService";
import { ErrorAlert } from "../UI/ErrorAlert";

interface SubjectPropertyFormProps {
  isExampleData?: boolean;
}

export function SubjectPropertyForm({ isExampleData = false }: SubjectPropertyFormProps) {
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
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Auto-populate form when subject is set (for example data)
  useEffect(() => {
    if (state.subject && isExampleData) {
      setFormData({
        address: state.subject.address || "",
        beds: state.subject.beds || 3,
        baths: state.subject.baths || 2,
        gla: state.subject.gla || 2000,
        lotSize: state.subject.lotSize || 0.25,
        yearBuilt: state.subject.yearBuilt || new Date().getFullYear(),
        propertyType: state.subject.propertyType || "single_family",
        condition: state.subject.condition || undefined,
        notes: state.subject.notes || "Example data - for development/testing purposes",
      });
    }
  }, [state.subject, isExampleData]);

  // Calculate age from year built
  const age = formData.yearBuilt
    ? new Date().getFullYear() - formData.yearBuilt
    : 0;

  const handleChange = (field: keyof SubjectPropertyInput, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateField = (field: keyof SubjectPropertyInput, value: unknown) => {
    const validation = validateSubjectProperty({ [field]: value });
    if (validation[field]) {
      setErrors((prev) => ({ ...prev, [field]: validation[field] }));
    }
  };

  const handleBlur = (field: keyof SubjectPropertyInput) => {
    const value = formData[field];
    if (value !== undefined) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = validateSubjectProperty(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsValidating(true);
    setValidationError(null);
    setLoading(true);

    try {
      const result = await validateSubject(formData as SubjectPropertyInput);

      if (result.valid && result.normalized) {
        setSubject(result.normalized);
        setError(null);
      } else {
        const errorMessages = result.errors?.map((e) => e.message).join(", ");
        setValidationError(errorMessages || "Validation failed");
        if (result.errors) {
          const fieldErrors: Record<string, string> = {};
          result.errors.forEach((error) => {
            fieldErrors[error.field] = error.message;
          });
          setErrors(fieldErrors);
        }
      }
    } catch (err) {
      setValidationError(
        err instanceof Error ? err.message : "Failed to validate subject property"
      );
    } finally {
      setIsValidating(false);
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.address &&
      formData.beds !== undefined &&
      formData.baths !== undefined &&
      formData.gla !== undefined &&
      formData.lotSize !== undefined &&
      formData.yearBuilt !== undefined &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {isExampleData && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            icon={<Science />}
            label="Example Data"
            color="info"
            size="small"
            sx={{ fontWeight: 500 }}
          />
          <Typography variant="caption" color="text.secondary">
            Pre-filled with example values for testing
          </Typography>
        </Box>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={formData.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            onBlur={() => handleBlur("address")}
            error={!!errors.address}
            helperText={errors.address}
            required
            InputProps={{
              endAdornment: isExampleData ? (
                <InputAdornment position="end">
                  <Chip label="Example" size="small" color="info" variant="outlined" />
                </InputAdornment>
              ) : undefined,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Bedrooms"
            type="number"
            value={formData.beds || ""}
            onChange={(e) => handleChange("beds", parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur("beds")}
            error={!!errors.beds}
            helperText={errors.beds}
            inputProps={{ min: 1, max: 10 }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Bathrooms"
            type="number"
            value={formData.baths || ""}
            onChange={(e) => handleChange("baths", parseFloat(e.target.value) || 0)}
            onBlur={() => handleBlur("baths")}
            error={!!errors.baths}
            helperText={errors.baths || "Use 0.5 increments (e.g., 2.5)"}
            inputProps={{ min: 0.5, max: 10, step: 0.5 }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Gross Living Area (sqft)"
            type="number"
            value={formData.gla || ""}
            onChange={(e) => handleChange("gla", parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur("gla")}
            error={!!errors.gla}
            helperText={errors.gla}
            inputProps={{ min: 100, max: 20000 }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Lot Size (acres)"
            type="number"
            value={formData.lotSize || ""}
            onChange={(e) => handleChange("lotSize", parseFloat(e.target.value) || 0)}
            onBlur={() => handleBlur("lotSize")}
            error={!!errors.lotSize}
            helperText={errors.lotSize}
            inputProps={{ min: 0.01, max: 100, step: 0.01 }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Year Built"
            type="number"
            value={formData.yearBuilt || ""}
            onChange={(e) => handleChange("yearBuilt", parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur("yearBuilt")}
            error={!!errors.yearBuilt}
            helperText={errors.yearBuilt || `Age: ${age} years`}
            inputProps={{ min: 1800, max: new Date().getFullYear() }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Property Type"
            value={formData.propertyType || "single_family"}
            onChange={(e) => handleChange("propertyType", e.target.value)}
          >
            <MenuItem value="single_family">Single Family</MenuItem>
            <MenuItem value="condominium">Condominium</MenuItem>
            <MenuItem value="townhouse">Townhouse</MenuItem>
            <MenuItem value="multi_family">Multi Family</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Condition (Optional)"
            value={formData.condition || ""}
            onChange={(e) => handleChange("condition", e.target.value || undefined)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="new_construction">New Construction</MenuItem>
            <MenuItem value="excellent">Excellent</MenuItem>
            <MenuItem value="good">Good</MenuItem>
            <MenuItem value="fair">Fair</MenuItem>
            <MenuItem value="poor">Poor</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notes (Optional)"
            multiline
            rows={3}
            value={formData.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Additional notes about the property..."
          />
        </Grid>

        {validationError && (
          <Grid item xs={12}>
            <ErrorAlert error={validationError} />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!isFormValid() || isValidating}
            fullWidth
          >
            {isValidating ? "Validating..." : "Save Subject Property"}
          </Button>
        </Grid>

        {state.subject && (
          <Grid item xs={12}>
            <Typography variant="body2" color="success.main">
              ✓ Subject property saved
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

