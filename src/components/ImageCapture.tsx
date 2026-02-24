import React, { useRef, useState } from 'react';
import { Camera, RefreshCw, X } from 'lucide-react';

interface ImageCaptureProps {
  onImageCaptured: (base64: string) => void;
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({ onImageCaptured }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const base64 = canvasRef.current.toDataURL('image/jpeg');
        setPreview(base64);
        onImageCaptured(base64);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const reset = () => {
    setPreview(null);
    onImageCaptured('');
  };

  return (
    <div className="space-y-4">
      {!stream && !preview && (
        <button
          type="button"
          onClick={startCamera}
          className="w-full py-8 border-2 border-dashed border-eco-300 rounded-2xl flex flex-col items-center justify-center gap-2 text-eco-600 hover:bg-eco-50 transition-colors"
        >
          <Camera size={40} />
          <span className="font-medium">التقط صورة للنفايات</span>
        </button>
      )}

      {stream && (
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <button
              type="button"
              onClick={captureImage}
              className="p-4 bg-eco-500 text-white rounded-full shadow-lg hover:bg-eco-600 transition-all"
            >
              <Camera size={24} />
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="p-4 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {preview && (
        <div className="relative rounded-2xl overflow-hidden group">
          <img src={preview} alt="Captured" className="w-full aspect-video object-cover" />
          <button
            type="button"
            onClick={reset}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
