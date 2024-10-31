import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { globalStyles } from '../../styles/globalStyles';
import { getStartAndEndOfMonth } from '../../utils/date';
import { tierColors } from '../../utils/tierColors';
import MainContainer from '../commons/layout/container/MainContainer';
import CalendarPost from './CalendarPost';
import { getKcalDataByDate, getTierByDate } from '../../api/calendarAPI';
import {
  calculateTotalSpendKcal,
  calculateTotalEarnKcal,
} from '../../utils/totalKcal';
import { dateToMmDd } from '../../utils/date';
import { useLoading } from '../../context/loadingContext';

export default function MainCalendar() {
  const { showLoading, hideLoading } = useLoading();
  const [tiers, setTiers] = useState([]);
  const [today, setToday] = useState();
  const [selectedDatePosts, setSelectedDatePosts] = useState();
  const [totalSpendKcal, setTotalSpendKcal] = useState();
  const [totalEarnKcal, setTotalEarnKcal] = useState();

  const fetchTierData = async (start, end) => {
    try {
      const dateRange = { start, end };
      const responseData = await getTierByDate(dateRange);
      const formattedData = responseData.map((item) => {
        const [year, month, day] = item.date;
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        return {
          id: item.id,
          userId: item.userId,
          date: formattedDate,
          tier: item.tier,
        };
      });
      setTiers(formattedData);
    } catch (error) {
      console.error('ERROR FETCHING TIERS');
    }
  };

  const fetchDataForSelectedDate = async (date) => {
    const data = await getKcalDataByDate(date);
    setSelectedDatePosts(data);
    setTotalEarnKcal(calculateTotalEarnKcal(data.exerciseRecords));
    setTotalSpendKcal(calculateTotalSpendKcal(data.mealRecords));
  };

  useEffect(() => {
    const currentDate = new Date();
    const { start, end } = getStartAndEndOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth(),
    );
    fetchTierData(start, end);
    setToday(dateToMmDd(currentDate));
    fetchDataForSelectedDate(currentDate.toLocaleDateString('en-CA'));
  }, []);

  const handleMonthChange = (month) => {
    const { start, end } = getStartAndEndOfMonth(month.year, month.month - 1);
    fetchTierData(start, end);
  };

  const markedDates = tiers.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {
      marked: true,
      dotColor: tierColors[current.tier],
    };
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <>
      <MainContainer>
        <Calendar
          theme={{
            selectedDayBackgroundColor: globalStyles.mainColor,
            arrowColor: globalStyles.mainColor,
            dotColor: 'green',
            todayTextColor: 'red',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
          }}
          markedDates={markedSelectedDates}
          monthFormat={'M월'}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            fetchDataForSelectedDate(day.dateString);
            setToday(dateToMmDd(day.dateString));
          }}
          onMonthChange={handleMonthChange}
        />
      </MainContainer>
      <MainContainer>
        <CalendarPost
          selectedDatePosts={selectedDatePosts}
          totalSpendKcal={totalSpendKcal}
          totalEarnKcal={totalEarnKcal}
          today={today}
        />
      </MainContainer>
    </>
  );
}
