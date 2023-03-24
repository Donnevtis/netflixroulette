import { useRouter } from 'next/router';

const useQueryString = () => {
  const router = useRouter();
  const {
    query: { slug, ...query },
  } = router;

  return (key: string, value: string) => {
    const as = new URLSearchParams();

    if (value) {
      as.set(key, value);
    }

    router.push(
      { pathname: '/search', query: { ...query, [key]: value } },
      `/search?${as.toString()}`,
      {
        scroll: false,
      },
    );
  };
};

export default useQueryString;
