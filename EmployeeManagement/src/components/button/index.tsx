import React, {useState} from 'react';
import {View, Text} from 'react-native';

const Button = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  return (
    <View style={{flex: 1, backgroundColor: '#c5ffb0', padding: 10}}>
      <Text
        onPress={() => {
          setEmployees(emp => {
            let newarr = [...emp, `Employee ${emp.length + 1}`];
            return newarr;
          });
        }}>
        {'+ Add Employee'}
      </Text>
      <View style={{flex: 1}}>
        {employees.map((x, index) => {
          return <Text key={`${index}`}>{`${x}`}</Text>;
        })}
      </View>
    </View>
  );
};
export default Button;
