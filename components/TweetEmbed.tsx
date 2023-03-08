import React from "react";

const TweetEmbed = ({ tweet }: { tweet: string }) => {
  const wrapper = React.useRef<HTMLQuoteElement>(null);
  React.useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    wrapper.current!.appendChild(script);
  }, []);
  return (
    <div className="mx-auto flex justify-center external-link">
      <blockquote ref={wrapper} className="twitter-tweet">
        <a href={tweet} target="_blank" rel="noopener noreferrer" />
      </blockquote>
    </div>
  );
};

export default TweetEmbed;
