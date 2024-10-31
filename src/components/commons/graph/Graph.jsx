import { LineChart } from 'react-native-chart-kit';

export default function Graph({ data, isWeight }) {
  const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    formatYLabel: (value) => {
      const numericValue = parseFloat(value);
      return data?.legend[0] === '체중 변화'
        ? numericValue.toFixed(1)
        : Math.round(numericValue).toString();
    },
    // propsForDots: {
    //   r: '6',
    //   strokeWidth: '2',
    //   // stroke: '#ffa726',
    // },
  };
  return (
    <>
      <LineChart
        data={data}
        width={330}
        height={200}
        yAxisSuffix={data?.legend[0] === '체중 변화' ? 'kg' : ''}
        chartConfig={chartConfig}
        // bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
}
