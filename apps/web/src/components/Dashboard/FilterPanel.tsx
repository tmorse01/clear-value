import { Box, TextField, Slider, Typography } from "@mui/material";
import { useState } from "react";
import { useReportContext } from "../../contexts/ReportContext";

export function FilterPanel() {
  const { state } = useReportContext();

  // Calculate min/max from comps (with defaults if no report)
  const comps = state.report?.comps || [];
  const minPrice = comps.length > 0 ? Math.min(...comps.map((c) => c.salePrice)) : 0;
  const maxPrice = comps.length > 0 ? Math.max(...comps.map((c) => c.salePrice)) : 1000000;
  const minSize = comps.length > 0 ? Math.min(...comps.map((c) => c.gla)) : 0;
  const maxSize = comps.length > 0 ? Math.max(...comps.map((c) => c.gla)) : 5000;
  const minYear = comps.length > 0 ? Math.min(...comps.map((c) => c.yearBuilt)) : 1900;
  const maxYear = comps.length > 0 ? Math.max(...comps.map((c) => c.yearBuilt)) : new Date().getFullYear();

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([minSize, maxSize]);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [yearBuiltRange, setYearBuiltRange] = useState<[number, number]>([
    minYear,
    maxYear,
  ]);
  const [maxDistance, setMaxDistance] = useState<number>(10);

  if (!state.report) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Price Range */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Price
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <TextField
            size="small"
            label="Min"
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            label="Max"
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
            sx={{ flex: 1 }}
          />
        </Box>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
          min={minPrice}
          max={maxPrice}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value.toLocaleString()}`}
        />
      </Box>

      {/* Size Range */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Size (sqft)
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <TextField
            size="small"
            label="Min"
            type="number"
            value={sizeRange[0]}
            onChange={(e) =>
              setSizeRange([Number(e.target.value), sizeRange[1]])
            }
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            label="Max"
            type="number"
            value={sizeRange[1]}
            onChange={(e) =>
              setSizeRange([sizeRange[0], Number(e.target.value)])
            }
            sx={{ flex: 1 }}
          />
        </Box>
        <Slider
          value={sizeRange}
          onChange={(_, newValue) => setSizeRange(newValue as [number, number])}
          min={minSize}
          max={maxSize}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} sqft`}
        />
      </Box>

      {/* Bedrooms */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Bedrooms: {bedrooms}
        </Typography>
        <Slider
          value={bedrooms}
          onChange={(_, newValue) => setBedrooms(newValue as number)}
          min={0}
          max={Math.max(...comps.map((c) => c.beds))}
          marks
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Bathrooms */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Bathrooms: {bathrooms}
        </Typography>
        <Slider
          value={bathrooms}
          onChange={(_, newValue) => setBathrooms(newValue as number)}
          min={0}
          max={Math.max(...comps.map((c) => c.baths))}
          marks
          step={0.5}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Year Built Range */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Year Built
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <TextField
            size="small"
            label="Min"
            type="number"
            value={yearBuiltRange[0]}
            onChange={(e) =>
              setYearBuiltRange([Number(e.target.value), yearBuiltRange[1]])
            }
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            label="Max"
            type="number"
            value={yearBuiltRange[1]}
            onChange={(e) =>
              setYearBuiltRange([yearBuiltRange[0], Number(e.target.value)])
            }
            sx={{ flex: 1 }}
          />
        </Box>
        <Slider
          value={yearBuiltRange}
          onChange={(_, newValue) =>
            setYearBuiltRange(newValue as [number, number])
          }
          min={minYear}
          max={maxYear}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Max Distance */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Max Distance (miles): {maxDistance}
        </Typography>
        <Slider
          value={maxDistance}
          onChange={(_, newValue) => setMaxDistance(newValue as number)}
          min={0}
          max={50}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} mi`}
        />
      </Box>
    </Box>
  );
}

