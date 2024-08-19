import React, { createContext, useState, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const commonComponents = {
    token: {
      colorBgBase: '#f0f0f0',
      colorPrimary: '#00b96b',
      colorTextBase: '#5b5c5f'
    }
  };

  const newTheme = theme === 'dark' ? {
    ...commonComponents,
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorBgBase: '#101319',
      colorPrimary: '#dde000',
      colorTextBase: '#afb6c1'
    }
  } : {
    ...commonComponents,
    algorithm: antdTheme.defaultAlgorithm
  };

  return (
    <ConfigProvider theme={newTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export { ThemeProvider, ThemeContext };
