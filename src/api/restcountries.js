export async function fetchCountryCodes() {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags');
  if (!res.ok) {
    console.error('REST Countries error', res.status, res.statusText);
    return [];
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error('Unexpected REST Countries payload:', data);
    return [];
  }

  return data
    .map(c => ({
      name: c.name.common,
      code: (c.idd?.root || '') + (c.idd?.suffixes?.[0] || ''),
      flag: c.flags?.png || '', // fallback
    }))
    .filter(c => c.code)
    .sort((a, b) => a.name.localeCompare(b.name));
}
