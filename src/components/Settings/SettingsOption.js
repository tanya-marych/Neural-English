import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Paddings, Color } from '../../constants';
import Wording from '../../wording';

const BORDER_COLOR = Color.BLACK(0.3);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: BORDER_COLOR,
    borderBottomWidth: 1,
    backgroundColor: Color.WHITE(1),
  },
  optionWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2 * Paddings.DEFAULT,
  },
  label: {
    color: Color.BLACK(),
    fontSize: 16,
  },
  labelValue: {
    color: Color.DARK_RASPBERRY,
    fontSize: 16,
  },
  checkSymbol: {
    color: Color.CELADON_GREEN,
    fontSize: 12,
  },
  optionValue: {
    color: Color.BLACK(0.7),
  },
  options: {
    width: '100%',
    paddingLeft: 3 * Paddings.DEFAULT,
  },
  valueContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: BORDER_COLOR,
    padding: 2 * Paddings.DEFAULT,
    paddingLeft: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const SettingsOption = ({ option, onPressOption, selectedOption }) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity onPress={() => setExpanded(!isExpanded)}>
      <View style={styles.container}>
        <View style={styles.optionWrapper}>
          <Text style={styles.label}>{option.label}</Text>
          {option.value
            ? <Text style={styles.labelValue}>
                {Wording.languages[option.value]}
              </Text>
            : null}
        </View>
        
        {option.values && isExpanded
          ? (
            <View style={styles.options}>
              {option.values.map((value) => (
                <TouchableOpacity
                  onPress={() => onPressOption(value)}
                  key={value}
                >
                  <View
                    style={styles.valueContainer}>
                    <Text style={styles.optionValue}>
                      {Wording.languages[value]}
                    </Text>
                    {selectedOption === value
                      ? <Text style={styles.checkSymbol}>✔</Text>
                      : null}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )
          : null}
      </View>
    </TouchableOpacity>
  );
}

SettingsOption.propTypes = {
  option: PropTypes.objectOf({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onPressOption: PropTypes.func.isRequired,
  selectedOption: PropTypes.string,
}

SettingsOption.defaultProps = {
  selectedOption: undefined,
}

export default SettingsOption;
