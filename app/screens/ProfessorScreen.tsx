import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const ProfessorScreen = () => {
  const pastClasses = [
    { date: '2025-01-12', attendance: 85 },
    { date: '2025-01-13', attendance: 90 },
    { date: '2025-01-14', attendance: 78 },
  ];

  const studentData = [
    { name: 'Alicee', attendance: 90, grade: 'A' },
    { name: 'Bob', attendance: 75, grade: 'B' },
    { name: 'Charlie', attendance: 85, grade: 'A-' },
  ];

  const realTimeAttendance = 18;
  const totalStudents = 25;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <Text style={styles.subHeader}>Real-time Overview</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={[
            {
              name: 'Present',
              population: realTimeAttendance,
              color: '#007ACC',
              legendFontColor: '#FFFFFF',
              legendFontSize: 12,
            },
            {
              name: 'Absent',
              population: totalStudents - realTimeAttendance,
              color: '#D9534F',
              legendFontColor: '#FFFFFF',
              legendFontSize: 12,
            },
          ]}
          width={Dimensions.get('window').width - 80}
          height={200}
          chartConfig={pieChartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          hasLegend={false}
          center={[65, 0]}
        />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#007ACC' }]} />
            <Text style={styles.legendText}>Present: {realTimeAttendance}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#D9534F' }]} />
            <Text style={styles.legendText}>Absent: {totalStudents - realTimeAttendance}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subHeader}>Attendance History</Text>
      <LineChart
        data={{
          labels: pastClasses.map((c) => c.date),
          datasets: [
            {
              data: pastClasses.map((c) => c.attendance),
            },
          ],
        }}
        width={Dimensions.get('window').width - 80}
        height={220}
        yAxisSuffix="%"
        chartConfig={lineChartConfig}
        style={styles.chartStyle}
      />

      <Text style={styles.subHeader}>Student Details</Text>
      {studentData.map((student, index) => (
        <View key={index} style={styles.studentCard}>
          <View style={styles.studentInfo}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.studentImage}
            />
            <View style={styles.studentTextContainer}>
              <Text style={styles.studentText}>Name: {student.name}</Text>
              <Text style={styles.studentText}>Attendance: {student.attendance}%</Text>
              <Text style={styles.studentText}>Grade: {student.grade}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const pieChartConfig = {
  backgroundGradientFrom: '#2C3E50',
  backgroundGradientTo: '#2C3E50',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#007ACC',
  },
};

const lineChartConfig = {
  backgroundGradientFrom: '#003366',
  backgroundGradientTo: '#003366',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 20,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#FFFFFF',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F7FBFF',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007ACC',
    textAlign: 'center',
    marginTop: 20,
  },
  subHeader: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#00000',
    textAlign: 'center',
  },
  chartContainer: {
    padding: 10,
    backgroundColor: '#2C3E50',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1E7FF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    alignItems: 'center', 
  },
  chartStyle: {
    borderRadius: 16,
    backgroundColor: '#003366',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    padding: 20,
  },
  legendContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  studentCard: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007ACC',
    marginRight: 15,
  },
  studentTextContainer: {
    flex: 1,
  },
  studentText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
});

export default ProfessorScreen;
