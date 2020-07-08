function generateQuery(queryParams, limit, offset) {
  const stringBuilder = ['?'];
  stringBuilder.push(`limit=${limit}&offset=${offset}`);

  Object.entries(queryParams).forEach(([key, value]) => {
    switch (key) {
      case 'categories':
        if (value.length > 0) stringBuilder.push(`&categoryId=in.${value.join(',')}`);
        break;
      case 'courseName':
        stringBuilder.push(`&name=ts.${value}`);
        break;
      case 'endDate':
        if (value !== '') stringBuilder.push(`&endDate=lt.${value}`);
        break;
      case 'startDate':
        if (value !== '') stringBuilder.push(`&startDate=gte.${value}`);
        break;
    }
  });
  return stringBuilder.join('');
}

module.exports = { generateQuery };
