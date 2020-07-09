import queryString from 'query-string';

export function generateQuery(queryParams, limit, offset) {
  const queryObject = {};
  queryObject.limit = limit;
  queryObject.offset = offset;

  Object.entries(queryParams).forEach(([key, value]) => {
    switch (key) {
      case 'categories':
        if (value.length > 0) {
          queryObject.categoryId = `in.${value.join(', ')}`;
        }
        break;
      case 'courseName':
        queryObject.name = `ts.${value}`;
        break;
      case 'endDate':
        if (value !== '') queryObject.endDate = `lt.${value}`;
        break;
      case 'startDate':
        if (value !== '') queryObject.startDate = `gte.${value}`;
        break;
    }
  });
  return queryString.stringify(queryObject);
}
