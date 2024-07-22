import React, { useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

interface ClassificationResult {
    className: string;
    probability: number;
  }

const Tersorflow: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [predictions, setPredictions] = useState<ClassificationResult[]>([]);

  const loadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const classifyImage = async () => {
    const img = document.getElementById('input-image') as HTMLImageElement;
    if (img) {
      const model = await mobilenet.load();
      const predictions = await model.classify(img);
      console.log(predictions,"<=====")

      setPredictions(predictions);
    }
  };

  return (
    <div className=" w-full">
      <h1>Image Classification with TensorFlow.js</h1>
      <input type="file" accept="image/*" onChange={loadImage} />
      {image && (
        <div>
          <img id="input-image" src={image as string} alt="Input" width="300" />
          <button onClick={classifyImage}>Classify Image</button>
        </div>
      )}
      {predictions.length > 0 && (
        <div>
          <h2 className='text-center text-lime-500'>Predictions:</h2>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>
                {prediction.className}: {Math.round(prediction.probability * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tersorflow;