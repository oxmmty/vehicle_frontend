import { Line } from '@ant-design/plots';
import React, { useContext } from 'react';
import { ThemeContext } from 'src/components/Theme';

const Dashboardpage = () => {
  const { theme } = useContext(ThemeContext);
  
  const data = [
    { year: '1991', value: 3, category: '1' },
    { year: '1992', value: 4, category: '1' },
    { year: '1993', value: 3.5, category: '1' },
    { year: '1994', value: 5, category: '1' },
    { year: '1995', value: 4.9, category: '1' },
    { year: '1996', value: 6, category: '1' },
    { year: '1997', value: 7, category: '1' },
    { year: '1998', value: 9, category: '1' },
    { year: '1999', value: 13, category: '1' },
    { year: '1991', value: 3, category: '2' },
    { year: '1992', value: 5, category: '2' },
    { year: '1993', value: 3, category: '2' },
    { year: '1994', value: 7, category: '2' },
    { year: '1995', value: 8.9, category: '2' },
    { year: '1996', value: 3, category: '2' },
    { year: '1997', value: 9, category: '2' },
    { year: '1998', value: 10, category: '2' },
    { year: '1999', value: 17, category: '2' },
  ];

  const config = {
    theme: theme === 'light' ? 'academy' : 'classicDark',
    data,
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    colorField: 'category',
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

export default Dashboardpage;