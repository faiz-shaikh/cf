export function regionsFormattedForDropdown(regions) {
  return regions.map(region => {
    return {
      value: region,
      text: region
    };
  });
}
