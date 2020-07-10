import isValid from 'date-fns/isValid';
import queryString from 'query-string';

export function generateQuery(queryParams, limit, offset) {
  const queryObject = { limit, offset };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (!value || value.length === 0) return;

    if (Array.isArray(value)) {
      queryObject[key] = `in.${value.join(', ')}`;
      return;
    }
    if (isValid(new Date(value))) {
      queryObject[key] = (value === 'startDate') ? `lt.${value}` : `gte.${value}`;
      return;
    }
    if (typeof value === 'number') {
      queryObject[key] = `eq.${value}`;
      return;
    }
    if (typeof value === 'string') {
      queryObject[key] = `ts.${value}`;
    }
  });
  return queryString.stringify(queryObject);
}
