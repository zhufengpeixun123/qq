import React, { useState, useEffect } from 'react';
import EachartsTable from '../../../components/eachartstable/eacharts';
import styles from './homePage.less';
import {
  ProfileOutlined,
  HourglassOutlined,
  FormatPainterOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
import { initHomeStatistics } from '@/api/Project.jsx';
import { transform } from '../../../utils/Config';
import { getNumAndUnit } from '@/utils/numberUtil';
function TableList(props) {
  const [projects, setprojects] = useState('');
  const [triples, settriples] = useState('');
  const [concepts, setconcepts] = useState('');
  useEffect(() => {
    initProjectdata();
  }, []);
  const initProjectdata = () => {
    initHomeStatistics().then(res => {
      const { result, projects, triples, concepts } = res;
      if (result == 'success') {
        setprojects(projects);
        settriples(triples);
        setconcepts(concepts);
      } else {
        return;
      }
    });
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.auto}>
        <div className={styles.autotop}>
          <div className={styles.eachartleft}>
            <div className={styles.eacharslide}>
              <div className={styles.eachartsimg}>
                <FormatPainterOutlined />
              </div>
              <div className={styles.eacharstext}>
                <p>项目总数</p>
                <p className={styles.eachrsp}>
                  {projects ? (
                    <span>{`${getNumAndUnit(projects, 0).num}${
                      getNumAndUnit(projects, 0).unit
                    }${getNumAndUnit(projects, 0).num1}${
                      getNumAndUnit(projects, 0).unit1
                    }${getNumAndUnit(projects, 0).num2}${
                      getNumAndUnit(projects, 0).unit2
                    }`}</span>
                  ) : (
                    <span>加载中···</span>
                  )}
                </p>
              </div>
            </div>
            <div className={styles.eacharslide}>
              {' '}
              <div className={styles.eachartsimg}>
                <HourglassOutlined />
              </div>
              <div className={styles.eacharstext}>
                <p>三元组数</p>
                <p className={styles.eachrsp}>
                  {triples ? (
                    <span>{`${getNumAndUnit(triples, 0).num}${
                      getNumAndUnit(triples, 0).unit
                    }${getNumAndUnit(triples, 0).num1}${
                      getNumAndUnit(triples, 0).unit1
                    }${getNumAndUnit(triples, 0).num2}${
                      getNumAndUnit(triples, 0).unit2
                    }`}</span>
                  ) : (
                    <span>加载中···</span>
                  )}
                </p>
              </div>
            </div>
            <div className={styles.eacharslide}>
              {' '}
              <div className={styles.eachartsimg}>
                <ProfileOutlined />
              </div>
              <div className={styles.eacharstext}>
                <p>概念总数</p>
                <p className={styles.eachrsp}>
                  {concepts ? (
                    <span>{`${getNumAndUnit(concepts, 0).num}${
                      getNumAndUnit(concepts, 0).unit
                    }${getNumAndUnit(concepts, 0).num1}${
                      getNumAndUnit(concepts, 0).unit1
                    }${getNumAndUnit(concepts, 0).num2}${
                      getNumAndUnit(concepts, 0).unit2
                    }`}</span>
                  ) : (
                    <span>加载中···</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.eachartright}>
            <EachartsTable />
            <p className={styles.textadd}>项目数趋势图</p>
          </div>
        </div>
        <div className={styles.autobottom}>
          <div className={styles.bottomslide}>
            <div className={styles.slidetop}>归一项目</div>
            <div className={styles.xiangmu}>
              <div className={styles.xiangmuscroll}>
                {/* <div className={styles.xiangmuwrapper}>
                  <div>归一项目1</div>
                  <div>
                    <span className={styles.colorgreen}>1万2千</span> 个概念
                  </div>
                </div>
                <div className={styles.xiangmuwrapper}>
                  <div>归一项目1</div>
                  <div>
                    <span className={styles.colorgreen}>1万2千</span> 个概念
                  </div>
                </div>
                <div className={styles.xiangmuwrapper}>
                  <div>归一项目1</div>
                  <div>
                    <span className={styles.colorgreen}>1万2千</span> 个概念
                  </div>
                </div>
                <div className={styles.xiangmuwrapper}>
                  <div>归一项目1</div>
                  <div>
                    <span className={styles.colorgreen}>1万2千</span> 个概念
                  </div>
                </div>
                <div className={styles.xiangmuwrapper}>
                  <div>归一项目1</div>
                  <div>
                    <span className={styles.colorgreen}>1万2千</span> 个概念
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className={styles.bottomslide}>
            <div className={styles.slidetop}>我的应用</div>
          </div>
          <div className={styles.bottomslide}>
            <div className={styles.slidetop}>任务通知</div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateProps = ({ list }) => {
  return {};
};
const mapDispatchProps = dispatch => {
  return {};
};
export default connect(mapStateProps, mapDispatchProps)(TableList);
