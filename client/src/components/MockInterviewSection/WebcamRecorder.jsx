import React, { useRef, useState, useEffect } from 'react';

const WebcamRecorder = ({ onVideoEnd }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = event => {
        setRecordedChunks(prevChunks => [...prevChunks, event.data]);
      };

      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        onVideoEnd(videoUrl); // Provide the video URL to the parent component
      };

      mediaRecorderRef.current.start();
    };

    startRecording();

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [recordedChunks, onVideoEnd]);

  return <video ref={videoRef} autoPlay muted />;
};

export default WebcamRecorder;
  