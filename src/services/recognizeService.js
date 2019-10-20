import Tflite from 'tflite-react-native';

let tflite = new Tflite();

// steps to run:
// 1.load model with loadModel func
// 2.detectObject with specific func

export const MODEL_TYPES = {
  MOBILE: 'MobileNet',
  SSD: 'SSD MobileNet',
  YOLO: 'Tiny YOLOv2',
};

const MODEL_PATHS = {
  [MODEL_TYPES.MOBILE]: {
    model: 'models/mobilenet_v1_1.0_224.tflite',
    label: 'models/mobilenet_v1_1.0_224.txt',
  },
  [MODEL_TYPES.YOLO]: {
    model: 'models/yolov2_tiny.tflite',
    label: 'models/yolov2_tiny.txt',
  },
  [MODEL_TYPES.SSD]: {
    model: 'models/ssd_mobilenet.tflite',
    label: 'models/ssd_mobilenet.txt',
  },
};

export const loadModel = (modelType) => {
  const modelInfo = MODEL_PATHS[modelType];

  tflite.loadModel({
    model: modelInfo.model,
    labels: modelInfo.label,
  },
    (err, res) => {
      if (err)
        console.log(err);
      else
        console.log(res);
    });
};

export const detectObjectWithSSD = (path, callback) =>
  tflite.detectObjectOnImage(
    {
      path,
      threshold: 0.2,
      numResultsPerClass: 1,
    }, (err, res) => {
      if (err)
        console.warn('ERROR[detectObjectWithSSD]: ', error);
      else {
        const formattedRes = res.map(item => ({
          label: item.detectedClass,
          confidence: item.confidenceInClass,
          rect: item.rect,
        }));
        callback(formattedRes);
      }
  });

export const detectObjectWithYOLO = (path, callback) =>
  tflite.detectObjectOnImage(
    {
      path,
      model: 'YOLO',
      imageMean: 0.0,
      imageStd: 255.0,
      threshold: 0.4,
      numResultsPerClass: 1,
    }, (err, res) => {
      if (err)
        console.warn('ERROR[detectObjectWithYOLO]: ', error);
      else {
        const formattedRes = res.map(item => ({
          label: item.detectedClass,
          confidence: item.confidenceInClass,
          rect: item.rect,
        }));
        callback(formattedRes);
      } 
  });

export const detectObjectWithMOBILE = (path, callback) =>
  tflite.runModelOnImage(
    {
      path,
      imageMean: 128.0,
      imageStd: 128.0,
      numResults: 3,
      threshold: 0.05
    }, (err, res) => {
      if (err)
        console.warn('ERROR[detectObjectWithMOBILE]: ', error);
      else {
        const formattedRes = res.map(item => ({
          label: item.label,
          confidence: item.confidence,
        }));
        callback(formattedRes);
      } 
  });

  // renderResults() {
  //   const { model, recognitions, imageHeight, imageWidth } = this.state;
  //   switch (model) {
  //     case MODEL_TYPES.SSD:
  //     case MODEL_TYPES.YOLO:
  //       return recognitions.map((res, id) => {
  //         var left = res["rect"]["x"] * imageWidth;
  //         var top = res["rect"]["y"] * imageHeight;
  //         var width = res["rect"]["w"] * imageWidth;
  //         var height = res["rect"]["h"] * imageHeight;
  //         return (
  //           <View key={id} style={[styles.box, { top, left, width, height }]}>
  //             <Text style={{ color: 'white', backgroundColor: blue }}>
  //               {res["label"] + " " + (res["confidence"] * 100).toFixed(0) + "%"}
  //             </Text>
  //           </View>
  //         )
  //       });
  //       break;

  //     default:
  //       return recognitions.map((res, id) => {
  //         return (
  //           <Text key={id} style={{ color: 'black' }}>
  //             {res["label"] + "-" + (res["confidence"] * 100).toFixed(0) + "%"}
  //           </Text>
  //         )
  //       });
  //   }
  // }