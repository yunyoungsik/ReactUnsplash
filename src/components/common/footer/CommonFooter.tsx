import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { imageData } from '@/store/selectors/imageSelectors';
import { pageState } from '@/store/atoms/pageState';
import styles from './CommonFooter.module.scss';

function CommonFooter() {
  const images = useRecoilValue(imageData);
  const [page, setPage] = useRecoilState(pageState);
  const [step, setStep] = useState(0);

  // 페이지 리스트 UI 생성
  const newArr: number[] = new Array();
  for (let i = 1; i <= images.total_pages; i++) {
    newArr.push(i);
  }
  const length = newArr.length;
  const divide = Math.floor(length / 10) + (Math.floor(length % 10) > 0 ? 1 : 0);
  const res = [];

  for (let i = 0; i <= divide; i++) {
    // 배열 0부터 n개씩 잘라 새 벼열에 넣기
    res.push(newArr.splice(0, 10));
  }

  const pages = res[step].map((page: number, index: number) => {
    if (page < 11) {
      return (
        <button
          className={
            index === page - 1
              ? `${styles.pagenation__button} ${styles.active}`
              : `${styles.pagenation__button} ${styles.inactive}`
          }
          onClick={() => moveToPage(page)}
        >
          {page}
        </button>
      );
    } else {
      <button
        className={
          index === page - 1 - step * 10
            ? `${styles.pagenation__button} ${styles.active}`
            : `${styles.pagenation__button} ${styles.inactive}`
        }
        onClick={() => moveToPage(page)}
      >
        {page}
      </button>;
    }
  });

  // ---

  const moveToPage = (selected: number) => {
    setPage(selected);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button}>
          <img src="/src/assets/icons/icon-arrowLeft.svg" alt="arrow left" />
        </button>

        {pages}

        <button className={styles.pagination__button}>
          <img src="/src/assets/icons/icon-arrowRight.svg" alt="arrow left" />
        </button>
      </div>
    </footer>
  );
}

export default CommonFooter;
