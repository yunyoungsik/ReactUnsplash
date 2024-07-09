import { useState } from 'react';
import styles from './CommonSearchBar.module.scss';
import { useRecoilState } from 'recoil';
import { searchState } from '@/store/atoms/searchState';
import { pageState } from '@/store/atoms/pageState';

function CommonSearchBar() {
  const [, setSearch] = useRecoilState(searchState);
  const [, setPage] = useRecoilState(pageState);
  const [text, setText] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onSearch = () => {
    if (text === '') {
      // iunput 태그 안에 빈 값으로 검색하였을 때 => searching default value
      setSearch('Korea');
    } else {
      setSearch(text); // 작성한 Input Value 값 할당
    }
    setPage(1);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (text === '') {
        // iunput 태그 안에 빈 값으로 검색하였을 때 => searching default value
        setSearch('Korea');
      } else {
        setSearch(text); // 작성한 Input Value 값 할당
      }
      setPage(1);
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input
          type="text"
          name=""
          id=""
          placeholder="찾으실 이미지를 검색하세요."
          className={styles.searchBar__search__input}
          value={text}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <img src="./icons/icon-search.svg" alt="search" onClick={onSearch} />
      </div>
    </div>
  );
}

export default CommonSearchBar;
