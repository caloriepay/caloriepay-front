export const calculateTotalSpendKcal = (spendData) => {
  return spendData.reduce((total, item) => {
    const spendKcal = item.data.reduce((sum, food) => sum + food.foodKcal, 0);
    return total + spendKcal;
  }, 0);
};

export const calculateTotalEarnKcal = (earnData) => {
  return earnData.reduce((total, item) => {
    const earnKcal = item.data.reduce(
      (sum, exercise) => sum + exercise.exerciseKcal,
      0,
    );
    return total + earnKcal;
  }, 0);
};
