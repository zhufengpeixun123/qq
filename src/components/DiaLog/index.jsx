import React from 'react';
import styles from './index.less';

const DiaLog = props => {
  const { x, y, hidden, item } = props;
  return (
    <div className={styles.wrap}>
      <div
        className={styles.dialog}
        style={{
          top: y + 82 + 'px',
          left: x + 'px',
          display: hidden ? 'block' : 'none',
        }}
      >
        <div className={styles.items} onClick={() => Blundeventitem(item)}>
          聚焦
        </div>
        <div className={styles.items}>添加关系</div>
        <div className={styles.items}>删除概念</div>
      </div>
    </div>
  );
};
export default DiaLog;
