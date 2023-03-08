const LoopingVideo = ({ src, caption }: { src: string; caption?: string }) => {
  return (
    <div className="flex flex-col items-center">
      <video autoPlay loop muted playsInline>
        <source src={`/videos/${src}`} type="video/mp4" />
      </video>
      {caption && <p className="mt-0 text-center text-sm">{caption}</p>}
    </div>
  );
};

export default LoopingVideo;
