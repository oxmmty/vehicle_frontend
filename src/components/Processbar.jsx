import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import nprogress from 'nprogress';

export const Processbar = () => {
  let location = useLocation();

  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location.pathname]);
};