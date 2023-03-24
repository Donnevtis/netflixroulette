import { useRouter } from 'next/router';

const useHandleClose = () => {
  const router = useRouter();
  return () => router.back();
};

export default useHandleClose;
