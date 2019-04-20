import React from 'react';
import PropTypes from 'prop-types';
import { createClassFromSpec } from 'react-vega';

import { injectPropsIntoSchema } from '../../../../utils/vegaUtils';
import { getDefaultColor } from '../../../../utils/vizUtils';
import { colors, sizes } from '../../../../constants';
import BarChartSchema from './schema';
import './styles.scss';

import Legend from '../../shared/Legend';
import ChartWrapper from '../../shared/ChartWrapper';


const buildData = (data) => {
  const retData = [];
  data.forEach((dataSet, idx) => {
    dataSet.values.forEach(point => retData.push({ x: point.x, y: point.y, c: idx }));
  });
  return retData;
};

const getColors = data => data.map((elem, idx) => elem.barColor || getDefaultColor(idx));

const BarChartClustered = (
  {
    data,
    title,
    className,
    colorScheme,
  },
) => {
  const colorRange = getColors(data);
  const Graph = createClassFromSpec(
    injectPropsIntoSchema(
      {
        $dataValues: {
          name: 'values',
          value: buildData(data),
        },
        $labelColor: {
          name: 'labelColor',
          value: colorScheme === 'light' ? colors.fontDark : colors.fontLight,
        },
        $labelFontSize: {
          name: 'labelFontSize',
          value: parseInt(sizes.fontSM.slice(0, -2), 10),
        },
        $colorRange: {
          name: 'range',
          value: colorRange,
        },
      },
      BarChartSchema,
    ),
  );
  return (
    <ChartWrapper title={title} className={className}>
      <Graph />
      <Legend
        series={data.map((elem, idx) => ({
          title: elem.dataSetName,
          description: elem.description,
          color: elem.barColor || getDefaultColor(idx),
        }))}
      />
    </ChartWrapper>
  );
};

BarChartClustered.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    dataSetName: PropTypes.string,
    barColor: PropTypes.string,
    description: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })),
  })).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  colorScheme: PropTypes.oneOf(['light', 'dark']),
};

BarChartClustered.defaultProps = {
  title: 'chart title',
  className: '',
  colorScheme: 'light',
};

export default BarChartClustered;