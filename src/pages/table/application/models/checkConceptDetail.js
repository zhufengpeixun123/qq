import { requestGetConceptInfo } from '../../services';

const initState = {
  dataSource: [],
  total: 0,
  node_id: '',
  concept_name: '',
  project_id: '',
  project_fieldcode: '',
  project_name: '',
};

export default {
  namespace: 'checkConceptDetail',
  state: initState,
  effects: {
    *onInit(effectTypes, { all, put, call }) {
      const { search } = effectTypes;
      if (search) {
        yield put({ type: 'searchConceptInfo', search });
      }
    },
    *getSearchValues(action, { select }) {
      const {
        dataSource,
        node_id,
        concept_name,
        project_id,
        project_fieldcode,
        project_name,
      } = yield select(state => state.checkConceptDetail);

      return {
        dataSource,
        node_id,
        concept_name,
        project_id,
        project_fieldcode,
        project_name,
      };
    },
    *onFocus({ nodeId }, { put }) {
      const values = yield put({ type: 'getSearchValues' });
      const { dataSource } = yield values;
      const focusNodesList = dataSource[0]?.graph?.nodes;
      const focusRelsList = dataSource[0]?.graph?.rels;

      const nodeData = focusNodesList.filter((v, k) => {
        return v.id === nodeId || v.id === 3600129;
      });
      const relsData = focusRelsList.filter((v, k) => {
        return nodeId === Number(v.source);
      });
      dataSource[0].graph.nodes = nodeData;
      dataSource[0].graph.rels = relsData;
      console.log(nodeId);
      if (relsData?.length < 1) {
        return;
      }
      if (relsData?.length > 0) {
        yield put({
          type: 'changeState',
          payload: {
            dataSource: dataSource,
          },
        });
      }
    },
    //归一查询搜索列表
    *searchConceptInfo({ search }, { select, call, put }) {
      try {
        yield put({
          type: 'changeState',
          payload: {
            node_id: search.itemId,
            concept_name: search.conceptName,
            project_id: search.projectId,
            project_fieldcode: search.code,
            project_name: search.name,
          },
        });
        const values = yield put({ type: 'getSearchValues' });
        const {
          node_id,
          concept_name,
          project_id,
          project_fieldcode,
          project_name,
        } = yield values;

        const searchObj = {
          node_id,
          concept_name,
          project_id,
          project_fieldcode,
          project_name,
          //search: encodeURIComponent(search),
        };

        const data = yield call(requestGetConceptInfo, searchObj);
        if (data.result === 'success') {
          yield put({
            type: 'changeState',
            payload: {
              dataSource: data.data,
              total: data.total,
            },
          });
        } else {
          yield put({
            type: 'changeState',
            payload: {
              dataSource: [],
              total: 0,
            },
          });
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  reducers: {
    changeState: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
};