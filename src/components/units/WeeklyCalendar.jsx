import CalendarStrip from 'react-native-calendar-strip';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { tierColors } from '../../utils/tierColors';
import { getCurrentMonth, getStartAndEndOfWeek } from '../../utils/date';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import { getTierByDate } from '../../api/calendarAPI';

export default function WeeklyCalendar({ onPressFooter }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    const date = getStartAndEndOfWeek();
    const data = await getTierByDate(date);
    setEvents(data);
  };
  useEffect(() => {
    fetchData();
  });

  const markedDates = events.map((event) => ({
    date: event.date,
    dots: [
      {
        color: tierColors[event.tier] || 'gray',
      },
    ],
  }));

  return (
    <>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>이번주 칼로리 소비 내역</Text>
        <Text style={styles.headerText}>{getCurrentMonth()}월</Text>
      </View>
      <CalendarStrip
        leftSelector={[]}
        rightSelector={[]}
        selectedDate={selectedDate}
        onDateSelected={(date) => setSelectedDate(date)}
        calendarHeaderStyle={{ display: 'none' }}
        locale={{
          name: 'ko',
          config: {
            months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split(
              '_',
            ),
            weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
          },
        }}
        markedDates={markedDates}
        highlightDateNameStyle={{ color: globalStyles.mainColor }}
        highlightDateNumberStyle={{ color: globalStyles.mainColor }}
        dateNameStyle={{ color: 'black' }}
        dateNumberStyle={{ color: 'black' }}
      />
      <View style={styles.footerWrapper}>
        <TouchableOpacity onPress={onPressFooter}>
          <View style={styles.footerTextWrapper}>
            <Text style={styles.footerText}>전체보기</Text>
            <ChevronRightIcon color="grey" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  footerWrapper: {
    borderTopWidth: 1,
    borderColor: globalStyles.gray,
    paddingTop: 10,
  },
  footerTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerText: {
    color: 'gray',
  },
});
