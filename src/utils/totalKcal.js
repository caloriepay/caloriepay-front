export const calculateTotalSpendKcal = (spendData) => {
  return spendData?.reduce((sum, item) => sum + item.caloriesBurned, 0) || 0;
};

export const calculateTotalEarnKcal = (exerciseRecords) => {
  return exerciseRecords?.reduce((sum, item) => sum + item.caloriesBurned, 0);
};
