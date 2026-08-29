# Vehicle Catalog Sources

Miles & Wheels keeps the customer-facing rental fleet deterministic in the frontend release.

## Current strategy

- 96 curated rental vehicles
- India-oriented categories and pricing
- No catalog API key required at runtime
- Vehicle pricing used by the stateless quote API is versioned with the source code
- Third-party data is not treated as rental availability

## External provider options for the operational release

### NHTSA vPIC / public APIs
Useful for reference taxonomy such as manufacturers, makes, models and VIN-related vehicle metadata. It includes motorcycle manufacturers, but it is not designed to represent Indian rental availability or provide a complete production image catalog.

### CarsXE
Offers year/make/model data, specifications and vehicle imagery. It requires an API key and production quotas are paid, so it should be added behind a server-side catalog adapter only when the project is ready to manage a real operational data source.

## Planned adapter boundary

The full-stack release can introduce a server-side `CatalogProvider` interface:

- `listMakes()`
- `listModels(make, year)`
- `getVehicleReference(make, model, year)`
- `getVehicleImages(make, model, year)`
- `syncRentalInventory()`

External reference data should remain separate from Miles & Wheels rental inventory, price rules and availability.
