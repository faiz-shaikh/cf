export function authorsFormattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName
    };
  });
}

export function regionsFormattedForDropdown(regions) {
  return regions.map(region => {
    return {
      value: region,
      text: region
    };
  });
}
