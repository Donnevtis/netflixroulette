import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IMG_PLACEHOLDER } from '@src/utils/constants';
import { PosterProps } from './Poster.types';
import styles from './Poster.module.scss';

const Poster = ({ url, className }: PosterProps) => {
  const [hasLoadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [url]);

  const handleError = () => {
    setLoadError(true);
  };

  return (
    <picture className={`${className} block relative w-full`}>
      <Image
        src={hasLoadError ? IMG_PLACEHOLDER : url || IMG_PLACEHOLDER}
        className={styles.img}
        alt="Movie poster"
        onError={handleError}
        width={333}
        height={500}
        priority={false}
      />
    </picture>
  );
};

export default Poster;
