import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { globalStyles } from '../../styles/globalStyles';
import { getStartAndEndOfMonth } from '../../utils/date';
import { tierColors } from '../../utils/tierColors';
import MainContainer from '../commons/layout/container/MainContainer';
import CalendarPost from './CalendarPost';
import { getKcalDataByDate } from '../../api/calendarAPI';
import {
  calculateTotalSpendKcal,
  calculateTotalEarnKcal,
} from '../../utils/totalKcal';

export default function MainCalendar() {
  const [tiers, setTiers] = useState([]);
  const [selectedDatePosts, setSelectedDatePosts] = useState();
  const [totalSpendKcal, setTotalSpendKcal] = useState();
  const [totalEarnKcal, setTotalEarnKcal] = useState();

  const fetchTierData = async (start, end) => {
    try {
      const dateRange = { start, end };
      console.log(dateRange);

      const data = [
        {
          id: 1,
          memberId: 1,
          date: '2024-09-02',
          tier: 'A',
        },
        {
          id: 2,
          memberId: 1,
          date: '2024-09-12',
          tier: 'C',
        },
        {
          id: 3,
          memberId: 1,
          date: '2024-09-22',
          tier: 'S',
        },
        {
          id: 4,
          memberId: 1,
          date: '2024-10-17',
          tier: 'B',
        },
      ];
      setTiers(data);
    } catch (error) {
      console.error('ERROR FETCHING TIERS');
    }
  };

  const fetchDataForSelectedDate = async (date) => {
    const data = await getKcalDataByDate(date);
    setSelectedDatePosts(data);
    setTotalSpendKcal(calculateTotalSpendKcal(data.spend));
    setTotalEarnKcal(calculateTotalEarnKcal(data.earn));
  };

  useEffect(() => {
    const currentDate = new Date();
    const { start, end } = getStartAndEndOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth(),
    );
    fetchTierData(start, end);
    fetchDataForSelectedDate(currentDate);
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
          }}
          onMonthChange={handleMonthChange}
        />
      </MainContainer>
      <MainContainer>
        <CalendarPost
          selectedDatePosts={selectedDatePosts}
          totalSpendKcal={totalSpendKcal}
          totalEarnKcal={totalEarnKcal}
        />
      </MainContainer>
    </>
  );
}
