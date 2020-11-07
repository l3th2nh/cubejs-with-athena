cube(`A`, {
  sql: `SELECT * FROM "sample-birthday-db".data_sample_birthday`,

  joins: {

  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [name]
    }
  },

  dimensions: {
    name: {
      sql: `name`,
      type: `string`
    },

    gender: {
      sql: `gender`,
      type: `string`
    },

    pYear: {
      sql: `p_year`,
      type: `string`
    },

    pMonth: {
      sql: `p_month`,
      type: `string`
    }
  }
});
