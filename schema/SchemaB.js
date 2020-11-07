cube(`B`, {
  sql: `SELECT birthyear, gender, count(*) as birth_count
  FROM "sample-birthday-db".data_sample_birthday
  WHERE birthyear>= 2010 AND birthyear <= 2015
  GROUP BY birthyear, gender`,

  joins: {

  },

  measures: {
    birth_count: {
      type: `sum`,
      sql: `birth_count`,
    },
  },

  dimensions: {
    year: {
      sql: `birthyear`,
      type: `number`
    },
    gender: {
      sql: `gender`,
      type: `string`
    }
  }
});
