import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RIGHT_OFFSET, BOTTOM_OFFSET } from '@src/utils/constants';
import useHiding from '@src/hooks/useHiding';
import { PATHS } from '@src/types';
import { ContextMenuProps } from './ContextMenu.types';
import styles from './ContextMenu.module.scss';
import Cross from '../../Cross/Cross';

const ContextMenu = ({ coordinateX, coordinateY, onClose, id }: ContextMenuProps) => {
  const {
    query: { slug, ...query },
  } = useRouter();
  const focusedElementRef = useHiding(onClose);
  const x = Math.min(window.innerWidth - RIGHT_OFFSET, coordinateX);
  const y = Math.min(window.pageYOffset + window.innerHeight - BOTTOM_OFFSET, coordinateY);

  return (
    <div ref={focusedElementRef} className={styles.menu} style={{ left: x, top: y }}>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        <Cross side="12" />
      </button>
      <Link
        href={{
          pathname: `${PATHS.MOVIE_EDIT}${id}`,
          query,
        }}
        as={`${PATHS.MOVIE_EDIT}${id}`}
        scroll={false}
        className={styles.edit}
        onClick={onClose}
      >
        Edit
      </Link>
      <Link
        href={{
          pathname: `${PATHS.MOVIE_DELETE}${id}`,
          query,
        }}
        as={`${PATHS.MOVIE_DELETE}${id}`}
        scroll={false}
        className={styles.delete}
        onClick={onClose}
      >
        Delete
      </Link>
    </div>
  );
};

export default ContextMenu;
