import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const styles = StyleSheet.create({
  overlayImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
  },
});

const Overlay = ({ children, onPress, visible }) => (
  <Modal transparent visible={visible}>
    <TouchableOpacity style={styles.overlay} onPress={onPress}>
      <BlurView
        style={styles.overlayImageContainer}
        blurType='light'
        blurAmount={3}
      >
        {children}
      </BlurView>
    </TouchableOpacity>
  </Modal>);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  visible: PropTypes.bool,
}

Overlay.defaultProps = {
  visible: false,
}

export default Overlay;
