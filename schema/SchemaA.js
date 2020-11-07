cube(`A`, {
  sql: `SELECT * FROM "sample-birthday-db".data_sample_birthday`,

  joins: {

  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [year, month, name, gender, height, weight]
    },
    maxHegiht: {
      sql: `${height}`,
      type: `max`,
    },
    averageHegiht: {
      sql: `${height}`,
      type: `avg`,
    }
  },

  dimensions: {
    // available type : string / number / boolean / time / geo
    name: {
      sql: `name`,
      type: `string`
    },

    gender: {
      sql: `gender`,
      type: `string`
    },

    height: {
      sql: `height`,
      type: `number`
    },

    weight: {
      sql: `weight`,
      type: `number`
    },

    year: {
      sql: `birthyear`,
      type: `number`
    },

    month: {
      sql: `birthmonth`,
      type: `number`
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
