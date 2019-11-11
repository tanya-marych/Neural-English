import { Header } from 'react-navigation-stack';

export const Color = {
  BLUE: '#25d5fd',
  PALE_COOPER: '#DB7F67',
  DARK_VANILLA: '#DBBEA1',
  BURNISHED_BROWN: '#A37B73',
  OLD_BURGUNGY: '#3F292B',
  RUBER: '#D34F73',

  
  RUBY: 'rgba(216, 17, 89, 1)',
  DARK_RASPBERRY: 'rgba(143, 45, 86, 1)',
  CELADON_GREEN: 'rgba(33, 131, 128, 1)',
  MIDDLE_BLUE: 'rgba(115, 210, 222, 1)',
  RED: 'red',

  YELLOW_ORANGE: (opacity = 1) => `rgba(255, 188, 66, ${opacity})`,
  BLACK: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  WHITE: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  // HEADER: 'rgba(249,249,249,1)',
  HEADER: 'rgb(232, 220, 225)',
};

export const Paddings = {
  DEFAULT: 8,
  HALF_DEFAULT: 4,
  MEDIUM: 12,
};

export const KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + 40;
