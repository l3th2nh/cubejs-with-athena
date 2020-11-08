/* globals window */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';
const cache = new InMemoryCache();
const defaultDashboardItems = [{ "vizState": "{\"query\":{\"measures\":[\"A.count\"],\"timeDimensions\":[],\"order\":{\"A.count\":\"desc\"},\"dimensions\":[\"A.gender\"],\"filters\":[]},\"chartType\":\"pie\",\"orderMembers\":[{\"id\":\"A.count\",\"title\":\"A Count\",\"order\":\"desc\"},{\"id\":\"A.gender\",\"title\":\"A Gender\",\"order\":\"none\"}],\"pivotConfig\":{\"x\":[\"A.gender\"],\"y\":[\"measures\"],\"fillMissingDates\":true,\"joinDateRange\":false},\"shouldApplyHeuristicOrder\":true}", "name": "2000~2020년 출생아 남녀성비", "id": "1", "layout": "{\"x\":0,\"y\":0,\"w\":4,\"h\":8}" }, { "vizState": "{\"query\":{\"measures\":[\"B.birth_sum\"],\"timeDimensions\":[],\"order\":{\"B.year\":\"asc\"},\"dimensions\":[\"B.year\"]},\"chartType\":\"line\",\"orderMembers\":[{\"id\":\"B.birth_sum\",\"title\":\"B Birth Sum\",\"order\":\"none\"},{\"id\":\"B.year\",\"title\":\"B Year\",\"order\":\"asc\"}],\"pivotConfig\":{\"x\":[\"B.year\"],\"y\":[\"measures\"],\"fillMissingDates\":true,\"joinDateRange\":false},\"shouldApplyHeuristicOrder\":true}", "name": "2010~2015년 출생아수", "id": "2", "layout": "{\"x\":4,\"y\":0,\"w\":4,\"h\":8}" }, { "vizState": "{\"query\":{\"measures\":[\"A.count\"],\"timeDimensions\":[],\"order\":{\"A.year\":\"asc\",\"A.month\":\"asc\"},\"dimensions\":[\"A.year\",\"A.month\",\"A.gender\"],\"filters\":[{\"dimension\":\"A.gender\",\"operator\":\"equals\",\"values\":[\"female\"]},{\"dimension\":\"A.pYear\",\"operator\":\"equals\",\"values\":[\"2000\",\"2001\"]}]},\"chartType\":\"bar\",\"orderMembers\":[{\"id\":\"A.count\",\"title\":\"A Count\",\"order\":\"none\"},{\"id\":\"A.year\",\"title\":\"A Year\",\"order\":\"asc\"},{\"id\":\"A.month\",\"title\":\"A Month\",\"order\":\"asc\"},{\"id\":\"A.gender\",\"title\":\"A Gender\",\"order\":\"none\"}],\"pivotConfig\":{\"x\":[\"A.year\",\"A.month\",\"A.gender\"],\"y\":[\"measures\"],\"fillMissingDates\":true,\"joinDateRange\":false},\"shouldApplyHeuristicOrder\":true}", "name": "2000년, 2001년 월별 여자 출생아 수", "id": "3", "layout": "{\"x\":8,\"y\":0,\"w\":4,\"h\":8}" }, { "vizState": "{\"query\":{\"measures\":[\"A.averageHegiht\"],\"timeDimensions\":[],\"order\":{\"A.year\":\"asc\"},\"dimensions\":[\"A.year\"],\"filters\":[{\"dimension\":\"A.year\",\"operator\":\"gt\",\"values\":[\"2010\"]}]},\"chartType\":\"table\",\"orderMembers\":[{\"id\":\"A.averageHegiht\",\"title\":\"A Average Hegiht\",\"order\":\"none\"},{\"id\":\"A.year\",\"title\":\"A Year\",\"order\":\"asc\"}],\"pivotConfig\":{\"x\":[\"A.year\"],\"y\":[\"measures\"],\"fillMissingDates\":true,\"joinDateRange\":false},\"shouldApplyHeuristicOrder\":true}", "name": "2010년 이후 출생아 평균 키", "id": "4", "layout": "{\"x\":0,\"y\":8,\"w\":4,\"h\":12}" }, { "vizState": "{\"query\":{\"measures\":[\"A.maxHegiht\"],\"timeDimensions\":[],\"order\":{\"A.year\":\"asc\",\"A.month\":\"asc\"},\"filters\":[],\"dimensions\":[\"A.year\",\"A.month\"]},\"chartType\":\"line\",\"orderMembers\":[{\"id\":\"A.maxHegiht\",\"title\":\"A Max Hegiht\",\"order\":\"none\"},{\"id\":\"A.year\",\"title\":\"A Year\",\"order\":\"asc\"},{\"id\":\"A.month\",\"title\":\"A Month\",\"order\":\"asc\"}],\"pivotConfig\":{\"x\":[\"A.year\",\"A.month\"],\"y\":[\"measures\"],\"fillMissingDates\":true,\"joinDateRange\":false},\"shouldApplyHeuristicOrder\":true,\"sessionGranularity\":null}", "name": "월별 출생아 Max Height", "id": "5", "layout": "{\"x\":4,\"y\":8,\"w\":4,\"h\":8}" }]

const getDashboardItems = () => JSON.parse(window.localStorage.getItem('dashboardItems')) || defaultDashboardItems;

const setDashboardItems = items => window.localStorage.setItem('dashboardItems', JSON.stringify(items));

const nextId = () => {
  const currentId = parseInt(window.localStorage.getItem('dashboardIdCounter'), 10) || 1;
  window.localStorage.setItem('dashboardIdCounter', currentId + 1);
  return currentId.toString();
};

const toApolloItem = i => ({
  ...i,
  __typename: 'DashboardItem'
});

const typeDefs = `
  type DashboardItem {
    id: String!
    layout: String
    vizState: String
    name: String
  }

  input DashboardItemInput {
    layout: String
    vizState: String
    name: String
  }

  type Query {
    dashboardItems: [DashboardItem]
    dashboardItem(id: String!): DashboardItem
  }

  type Mutation {
    createDashboardItem(input: DashboardItemInput): DashboardItem
    updateDashboardItem(id: String!, input: DashboardItemInput): DashboardItem
    deleteDashboardItem(id: String!): DashboardItem
  }
`;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      dashboardItems() {
        const dashboardItems = getDashboardItems();
        return dashboardItems.map(toApolloItem);
      },

      dashboardItem(_, {
        id
      }) {
        const dashboardItems = getDashboardItems();
        return toApolloItem(dashboardItems.find(i => i.id.toString() === id));
      }

    },
    Mutation: {
      createDashboardItem: (_, {
        input: { ...item
        }
      }) => {
        const dashboardItems = getDashboardItems();
        item = {
          ...item,
          id: nextId(),
          layout: JSON.stringify({})
        };
        dashboardItems.push(item);
        setDashboardItems(dashboardItems);
        return toApolloItem(item);
      },
      updateDashboardItem: (_, {
        id,
        input: { ...item
        }
      }) => {
        const dashboardItems = getDashboardItems();
        item = Object.keys(item).filter(k => !!item[k]).map(k => ({
          [k]: item[k]
        })).reduce((a, b) => ({
          ...a,
          ...b
        }), {});
        const index = dashboardItems.findIndex(i => i.id.toString() === id);
        dashboardItems[index] = {
          ...dashboardItems[index],
          ...item
        };
        setDashboardItems(dashboardItems);
        return toApolloItem(dashboardItems[index]);
      },
      deleteDashboardItem: (_, {
        id
      }) => {
        const dashboardItems = getDashboardItems();
        const index = dashboardItems.findIndex(i => i.id.toString() === id);
        const [removedItem] = dashboardItems.splice(index, 1);
        setDashboardItems(dashboardItems);
        return toApolloItem(removedItem);
      }
    }
  }
});
export default new ApolloClient({
  cache,
  link: new SchemaLink({
    schema
  })
});